<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\LessonNote;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LessonNoteController extends Controller
{
    public function show(Request $request, string $lessonKey): JsonResponse
    {
        $note = LessonNote::query()->where('user_id', $request->user()->id)->where('lesson_key', $lessonKey)->first();

        return response()->json(['note' => $note]);
    }

    public function update(Request $request, string $lessonKey): JsonResponse
    {
        $data = $request->validate(['content' => ['required', 'string', 'max:20000']]);
        $note = LessonNote::query()->updateOrCreate(['user_id' => $request->user()->id, 'lesson_key' => $lessonKey], ['content' => $data['content']]);

        return response()->json(['note' => $note]);
    }

    public function destroy(Request $request, string $lessonKey): JsonResponse
    {
        LessonNote::query()->where('user_id', $request->user()->id)->where('lesson_key', $lessonKey)->delete();

        return response()->json(['message' => 'Note deleted.']);
    }
}
