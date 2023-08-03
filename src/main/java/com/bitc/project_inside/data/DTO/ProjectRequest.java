package com.bitc.project_inside.data.DTO;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
public class ProjectRequest {

    private int projectIdx; //

    private int projectMatchingIdx; //

    private String projectLeaderId; //

    private String projectThumbnail; //

    private int projectLike; //

    private int projectLevel; //

    private int projectMember; //

    private String projectTitle; //

    private String projectLanguage; //

    private String projectContent; //

    private LocalDate projectDate; //

    private String projectFull; // 상태값

}
