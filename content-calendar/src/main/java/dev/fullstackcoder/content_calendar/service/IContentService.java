package dev.fullstackcoder.content_calendar.service;

import java.util.List;

import dev.fullstackcoder.content_calendar.model.Content;

public interface IContentService {

    List<Content> getAllContent();

    List<Content> getContent(int limit, int offset);
    
    Content getContentById(Long id);

    Content addContent(Content content);

    void updateContent(Content content);

    void deleteContent(Long id);

}