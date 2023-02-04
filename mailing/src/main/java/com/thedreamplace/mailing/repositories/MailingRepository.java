package com.thedreamplace.mailing.repositories;

import com.thedreamplace.mailing.entities.MailingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MailingRepository extends JpaRepository<MailingEntity, Integer>{

}