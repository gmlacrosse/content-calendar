package dev.fullstackcoder.content_calendar.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import dev.fullstackcoder.content_calendar.data.ContentRepository;
import dev.fullstackcoder.content_calendar.model.Content;

@Component
public class ContentService implements IContentService {
    @Autowired
    private ContentRepository contentRepository;

    @Override
    public List<Content> getAllContent() {
        try {
            return contentRepository.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Content getContentById(Long id) {
        try {
            return contentRepository.findById(id).orElse(null);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Content addContent(Content content) {
        try {
            content.setDateCreated(LocalDateTime.now());
            return contentRepository.save(content);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void updateContent(Content content) {
        try {
            contentRepository.save(content);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteContent(Long id) {
        try {
            contentRepository.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
