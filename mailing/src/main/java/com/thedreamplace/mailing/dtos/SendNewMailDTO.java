package com.thedreamplace.mailing.dtos;

import lombok.Data;

@Data
public class SendNewMailDTO {
    private String to;
    private String name;
    private String email;
}
