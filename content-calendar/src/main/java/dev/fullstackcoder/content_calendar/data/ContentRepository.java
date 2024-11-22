package dev.fullstackcoder.content_calendar.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import dev.fullstackcoder.content_calendar.model.Content;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {
    @Query(value ="SELECT * FROM content ORDER BY date_created", nativeQuery = true)
    List<Content> getContent();
}
