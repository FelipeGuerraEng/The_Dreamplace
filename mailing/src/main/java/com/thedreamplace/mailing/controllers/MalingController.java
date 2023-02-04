package com.thedreamplace.mailing.controllers;

import com.thedreamplace.mailing.dtos.SendCredentialsDTO;
import com.thedreamplace.mailing.dtos.SendNewMailDTO;
import com.thedreamplace.mailing.services.MailingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;

@RestController
@RequestMapping("/mail")
@CrossOrigin("*")
public class MalingController {

    @Autowired
    private MailingService mailingService;

    @GetMapping("/")
    public ResponseEntity<?> getAllSentEmails() {
        return ResponseEntity.ok(mailingService.getAllSentEmails());
    }

    @PostMapping("/credentials")
    public ResponseEntity<String> sendCredentials(@RequestBody SendCredentialsDTO credentialsDTO)
            throws MessagingException, IOException {
        mailingService.sendCredentialEmail(credentialsDTO.getTo(),credentialsDTO.getName(),
                credentialsDTO.getUsername(), credentialsDTO.getPassword());

        return new ResponseEntity<String>("Email Sent", HttpStatus.CREATED);
    }

    @PostMapping("/new_email")
    public ResponseEntity<String> sendNewEmailCredentials(@RequestBody SendNewMailDTO newMailDTO)
            throws MessagingException, IOException {
        mailingService.sendUpdatedEmail(newMailDTO.getTo(),newMailDTO.getName(),
                newMailDTO.getEmail());

        return new ResponseEntity<String>("Email Sent", HttpStatus.CREATED);
    }
}
