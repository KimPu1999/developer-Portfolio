<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EducationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'focus' => $this->focus,
            'status' => $this->status_label,
            'academicLevel' => $this->academic_level,
            'institution' => $this->institution,
            'location' => $this->location,
            'graduationYear' => $this->graduation_year,
            'dates' => $this->date_label,
            'coursework' => $this->coursework,
            'relatedTechnologies' => $this->related_technologies,
            'displayOrder' => $this->display_order,
        ];
    }
}
