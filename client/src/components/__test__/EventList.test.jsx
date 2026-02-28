import React from 'react';
import { render, screen , fireEvent } from '@testing-library/react';
import { describe, test, expect, vi} from 'vitest';
import EventList from '../EventList';

describe('EventList', () => {

    const mockEvents = [
        {
            id: 1,
            name: "Tech Meetup",
            location: "Seattle",
            event_date_time: "2026-03-01T10:30",
            category: "Tech",
            description: "Dev meetup",
        },
        {
            id: 2,
            name: "Wildlife Talk",
            location: "DC",
            event_date_time: "2026-03-01T14:00",
            category: "Nature",
            description: "Monkey research",
        },
    ];

    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();

    test('renders event list with events', () => {
        render(<EventList events={mockEvents} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
        
        expect(screen.getByText('Tech Meetup')).toBeInTheDocument();
        expect(screen.getByText('Wildlife Talk')).toBeInTheDocument();
        expect(screen.getByText('Seattle')).toBeInTheDocument();
        expect(screen.getByText('DC')).toBeInTheDocument();
    });

    test('calls onEdit when edit button is clicked', () => {
        render(<EventList events={mockEvents} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
        
        const editButtons = screen.getAllByRole('button', { name: /edit/i });
        fireEvent.click(editButtons[0]);
        
        expect(mockOnEdit).toHaveBeenCalledWith(mockEvents[0]);
    });

    test('calls onDelete when delete button is clicked', () => {
        render(<EventList events={mockEvents} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
        
        const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
        fireEvent.click(deleteButtons[0]);
        
        expect(mockOnDelete).toHaveBeenCalledWith(mockEvents[0].id);
    });
});
