import { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import PreviewCourses from './PreviewCourses';

export default function FeaturedCourses() {

    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/courses/')
            .then(res => res.json())
            .then(data => {
                const numbers = new Set();
                const featured = [];

                const numberOfCourses = Math.min(5, data.length);

                while (numbers.size < numberOfCourses) {
                    const randomNum = Math.floor(Math.random() * data.length);
                    numbers.add(randomNum);
                }

                [...numbers].forEach(index => {
                    featured.push(
                        <PreviewCourses 
                            data={data[index]} 
                            key={data[index]._id} 
                            breakPoint={2} 
                        />
                    );
                });

                setPreviews(featured);
            });
    }, []);

    return (
        <div className="p-4 bg-transparent">
            <h2 className="text-center text-white">Featured Courses</h2>
            <CardGroup className="justify-content-center bg-transparent">
                {previews}
            </CardGroup>
        </div>
    );
}
