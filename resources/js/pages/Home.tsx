import {
    AboutSection,
    HeroSection,
    KandidatSection,
    Navbar,
    PancasilaPrinciples,
    VisiMisiDialog,
    VotedStudentsMarquee,
} from '@/components/home';
import { BATIK_PATTERN_URL, GARUDA_URL, HOME_STYLES, TYPING_TEXT_ARRAY } from '@/constants/home';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';
import { useVotedStudents } from '@/hooks/useVotedStudents';
import { AuthProps, Kandidat } from '@/types/voting';
import { getStudentAvatar } from '@/utils/avatar';
import { getPemiraYear } from '@/utils/date';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    kandidat: Kandidat[];
    auth?: AuthProps;
}

export default function LandingPage({ kandidat, auth }: Props) {
    const { votedStudents, loading } = useVotedStudents();
    const typingText = useTypingAnimation(TYPING_TEXT_ARRAY);
    const pemiraYear = getPemiraYear();

    const [selectedKandidat, setSelectedKandidat] = useState<Kandidat | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const openDialog = (calon: Kandidat) => {
        setSelectedKandidat(calon);
        setTimeout(() => {
            setShowDialog(true);
            setIsClosing(false);
        }, 50);
    };

    const closeDialog = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowDialog(false);
            setIsClosing(false);
        }, 400);
    };

    return (
        <>
            <Head title={`PEMIRA ${pemiraYear} - Pemilihan Raya Mahasiswa`} />

            <style dangerouslySetInnerHTML={{ __html: HOME_STYLES }} />

            <Navbar user={auth?.user} />

            <main className="flex-1">
                <HeroSection typingText={typingText} batikPatternUrl={BATIK_PATTERN_URL} isAuthenticated={!!auth?.user} />

                <VotedStudentsMarquee students={votedStudents} loading={loading} getInitialAvatar={getStudentAvatar} />

                <PancasilaPrinciples />

                <AboutSection garudaUrl={GARUDA_URL} />

                <KandidatSection kandidat={kandidat} onOpenDialog={openDialog} />

                <VisiMisiDialog show={showDialog} kandidat={selectedKandidat} isClosing={isClosing} onClose={closeDialog} />
            </main>
        </>
    );
}
