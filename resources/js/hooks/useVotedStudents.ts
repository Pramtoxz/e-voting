import { VotedStudent } from '@/types/voting';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function useVotedStudents() {
    const [votedStudents, setVotedStudents] = useState<VotedStudent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVotedStudents = async () => {
            try {
                const response = await axios.get('/voted-students');
                setVotedStudents(response.data);
            } catch (error) {
                console.error('Error fetching voted students:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVotedStudents();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const response = await axios.get('/voted-students');
                setVotedStudents(response.data);
            } catch (error) {
                console.error('Error fetching voted students:', error);
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return { votedStudents, loading };
}
