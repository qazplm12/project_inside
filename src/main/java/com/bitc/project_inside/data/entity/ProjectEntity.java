package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Entity
@Table(name = "project")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EntityListeners(AuditingEntityListener.class)
public class ProjectEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int projectIdx; //

    @Column
    private int projectMatchingIdx; //

    @Column
    private String projectLeaderId; //

    @Column(length = 500)
    private String projectThumbnail; //

    @Column
    private int projectLike; //

    @Column
    private int projectLevel; //

    @Column
    private int projectMember; //

    @Column
    private String projectTitle; //

    @Column
    private String projectLanguage; //

    @Column(length = 5000)
    private String projectContent; //

    @Column
    @CreatedDate
    private LocalDate projectDate; //

    @Column
    private String projectFull; // 상태값

    @Column
    private String projectFinish;
}
