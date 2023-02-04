package com.thedreamplace.mailing.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "mailing")
@Setter
@Getter
public class MailingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Lob
    @Column(name = "name", unique = true)
    private String name;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "username", length = 100)
    private String username;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public MailingEntity() {

    }
    public MailingEntity(String name, String email, String username) {
        this.name = name;
        this.email = email;
        this.username = username;
        this.createdAt = LocalDateTime.now();
    }
}