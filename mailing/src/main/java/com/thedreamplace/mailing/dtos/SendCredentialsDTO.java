package com.thedreamplace.mailing.dtos;

import lombok.Data;

@Data
public class SendCredentialsDTO {
    private String to;
    private String name;
    private String username;
    private String password;

}
