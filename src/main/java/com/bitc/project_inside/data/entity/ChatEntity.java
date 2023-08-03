package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "chat")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EntityListeners(AuditingEntityListener.class)
public class ChatEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int chatIdx;

    @Column
    private int chatMatchingIdx;

    @Column
    private String chatMemberNick;

    @Column
    private String chatContent;

    @Column
    private String chatTime;

    @PrePersist
    public void onPrePersist() {
        this.chatTime = LocalDate.now().format(DateTimeFormatter.ofPattern("HH:mm"));
    }

}
