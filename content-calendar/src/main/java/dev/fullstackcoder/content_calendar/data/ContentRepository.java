package dev.fullstackcoder.content_calendar.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.fullstackcoder.content_calendar.model.Content;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {

}