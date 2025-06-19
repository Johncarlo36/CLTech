import React from 'react';
import { Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function ArchiveCourse({ courseId, isActive, fetchData }) {
    const notyf = new Notyf();

    // Debug: Log received props to verify correct data
    console.log("Course ID:", courseId, "| isActive:", isActive);

    const token = localStorage.getItem('token');

    // Archive function for deactivating course
    const archiveToggle = async () => {
        try {
            const response = await fetch(`http://localhost:4000/courses/${courseId}/archive`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                notyf.success("Successfully Archived");
                fetchData();
            } else {
                notyf.error(data.message || "Archive failed.");
            }
        } catch (err) {
            console.error(err);
            notyf.error("Network error. Please try again.");
        }
    };

    // Activate function for reactivating course
    const activateToggle = async () => {
        try {
            const response = await fetch(`http://localhost:4000/courses/${courseId}/activate`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                notyf.success("Successfully Activated");
                fetchData();
            } else {
                notyf.error(data.message || "Activation failed.");
            }
        } catch (err) {
            console.error(err);
            notyf.error("Network error. Please try again.");
        }
    };

    return (
        <>
            {
                isActive ? (
                    // When course is active, show Archive button
                    <Button variant="danger" className="mx-1" onClick={archiveToggle}>
                        Archive
                    </Button>
                ) : (
                    // When course is inactive, show Activate button
                    <Button variant="success" className="mx-1" onClick={activateToggle}>
                        Activate
                    </Button>
                )
            }
        </>
    );
}