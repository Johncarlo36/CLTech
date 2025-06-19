import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function EditCourse({ course, fetchData }) {
    const notyf = new Notyf();

    // Prefer `_id` over `id`, fallback to `id` if needed
    const courseId = course._id || course.id;

    const [name, setName] = useState(course.name);
    const [description, setDescription] = useState(course.description);
    const [price, setPrice] = useState(course.price);
    const [showEdit, setShowEdit] = useState(false);

    const editOpen = () => setShowEdit(true);
    const editClose = () => setShowEdit(false);

    const editCourse = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if (!token) {
            notyf.error('Missing token. Please log in again.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/courses/${courseId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    price: price
                })
            });

            const data = await response.json();
            console.log("Server response:", data); // 🔍 Inspect the server's response

            if (data.success === true) {
                notyf.success('Successfully Updated');
                editClose();
                fetchData();
            } else {
                notyf.error(data.message || 'Something went wrong. Please try again.');
                editClose();
                fetchData();
            }
        } catch (error) {
            console.error("Error while updating course:", error);
            notyf.error('Network or server error. Please try again later.');
        }
    };

    return (
        <>
            <Button variant="primary" type="button" className="mx-1" onClick={editOpen}>
                Edit
            </Button>

            <Modal show={showEdit} onHide={editClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={editCourse}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={editClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
