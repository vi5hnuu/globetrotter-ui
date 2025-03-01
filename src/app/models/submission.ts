package com.vi5hnu.gobetrotter_api.Dto;

import com.vi5hnu.gobetrotter_api.constants.Constants;
import com.vi5hnu.gobetrotter_api.utils.IdGenerators;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class SubmissionDto {
    private String id;
    private String userId;
    private String questionId;
    private String choice;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}