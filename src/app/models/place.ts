package com.vi5hnu.gobetrotter_api.Dto;

import com.vi5hnu.gobetrotter_api.Dto.user.UserDto;
import com.vi5hnu.gobetrotter_api.constants.Constants;
import com.vi5hnu.gobetrotter_api.utils.IdGenerators;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class PlaceDto {
    public final static String TABLE_NAME = "places";
    private String id;

    private String alias;
    private String name;

    private List<String> clues;

    private List<String> funFacts;
}