from io import BytesIO
from pathlib import Path
import re

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE_PDF = ROOT / 'public/resume/resume.pdf'
PHOTO = ROOT / 'public/profile/profile.png'
OUTPUTS = [SOURCE_PDF, ROOT / 'output/pdf/resume.pdf']


def object_bytes(document: bytes, number: int) -> bytes:
    start_match = re.search(rb'(?m)^' + str(number).encode() + rb' 0 obj\n', document)
    if not start_match:
        raise ValueError(f'PDF object {number} was not found')
    end = document.find(b'\nendobj', start_match.end())
    if end < 0:
        raise ValueError(f'PDF object {number} has no end marker')
    return document[start_match.start():end + len(b'\nendobj')]


def with_photo(document: bytes, jpeg: bytes, width: int, height: int) -> bytes:
    page = object_bytes(document, 3)
    page_resources = b'/Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> /Contents'
    replacement = b'/Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> /XObject << /Im1 15 0 R >> >> /Contents'
    if page_resources not in page:
        raise ValueError('Resume page resources changed; photo was not embedded')
    page = page.replace(page_resources, replacement, 1)

    contents = object_bytes(document, 8)
    stream_start = contents.index(b'stream\n') + len(b'stream\n')
    stream_end = contents.rindex(b'\nendstream')
    stream = contents[stream_start:stream_end] + b'\nq 113 0 0 151 440 686 cm /Im1 Do Q\n'
    contents = re.sub(rb'/Length \d+', b'/Length ' + str(len(stream)).encode(), contents, count=1)
    contents = contents[:stream_start] + stream + contents[stream_end:]

    image = (b'15 0 obj\n<< /Type /XObject /Subtype /Image /Width ' + str(width).encode()
             + b' /Height ' + str(height).encode()
             + b' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length '
             + str(len(jpeg)).encode() + b' >>\nstream\n' + jpeg + b'\nendstream\nendobj')

    objects = [object_bytes(document, number) for number in range(1, 15)]
    objects[2] = page
    objects[7] = contents
    objects.append(image)

    output = bytearray(b'%PDF-1.4\n')
    offsets = [0]
    for item in objects:
        offsets.append(len(output))
        output.extend(item)
        output.extend(b'\n')

    xref_offset = len(output)
    output.extend(b'xref\n0 16\n0000000000 65535 f \n')
    for offset in offsets[1:]:
        output.extend(f'{offset:010d} 00000 n \n'.encode())
    output.extend(b'trailer\n<< /Size 16 /Root 1 0 R >>\nstartxref\n')
    output.extend(str(xref_offset).encode())
    output.extend(b'\n%%EOF\n')
    return bytes(output)


with Image.open(PHOTO) as image:
    rgb = image.convert('RGB')
    buffer = BytesIO()
    rgb.save(buffer, format='JPEG', quality=92, optimize=True)
    jpeg = buffer.getvalue()
    width, height = rgb.size

document = SOURCE_PDF.read_bytes()
result = with_photo(document, jpeg, width, height)
for output in OUTPUTS:
    output.write_bytes(result)
    print(f'updated {output} ({len(result)} bytes)')
