package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "project")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@DynamicInsert // 디폴트 값 줄때
@EntityListeners(AuditingEntityListener.class)
public class ProjectEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int projectIdx; //

    @Column
    private String projectLeaderId; //

    @Column
    private String personNickName;

    @Column(length = 5000)
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

    @Column(length = 500000)
    private String projectContent; //

    @Column(nullable = false)
    private LocalDateTime projectDate = LocalDateTime.now(); //

    @Column
    private String projectFull; // 상태값

    @Column
    private String projectFinish;

    @ColumnDefault("true") // 1
    private int likePlusProjectCheck;

    @ColumnDefault("false") // 0
    private int likeMinProjectCheck;
}
