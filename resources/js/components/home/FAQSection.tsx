import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: 'Apa itu PEMIRA?',
        answer: 'PEMIRA (Pemilihan Raya Mahasiswa) adalah proses pemilihan pemimpin organisasi kemahasiswaan di tingkat universitas. Melalui PEMIRA, mahasiswa dapat memilih calon pemimpin yang akan mewakili aspirasi dan kepentingan mereka.',
    },
    {
        question: 'Siapa yang berhak mengikuti PEMIRA?',
        answer: 'Seluruh mahasiswa aktif STMIK-AMIK Jayanusa yang terdaftar dalam sistem akademik berhak untuk mengikuti PEMIRA. Setiap mahasiswa memiliki satu suara yang dapat digunakan untuk memilih kandidat.',
    },
    {
        question: 'Bagaimana cara melakukan voting?',
        answer: 'Untuk melakukan voting, mahasiswa perlu login menggunakan akun kampus, kemudian memilih kandidat yang diinginkan. Setelah memilih, konfirmasi pilihan Anda dan voting akan tercatat dalam sistem.',
    },
    {
        question: 'Apakah voting bersifat rahasia?',
        answer: 'Ya, voting bersifat rahasia dan aman. Sistem kami menjamin kerahasiaan pilihan setiap mahasiswa. Tidak ada pihak yang dapat mengetahui pilihan Anda kecuali Anda sendiri.',
    },
    {
        question: 'Kapan hasil PEMIRA akan diumumkan?',
        answer: 'Hasil PEMIRA akan diumumkan setelah masa voting berakhir dan proses perhitungan suara selesai dilakukan. Pengumuman akan dilakukan secara resmi melalui website dan media sosial kampus.',
    },
    {
        question: 'Apa yang harus dilakukan jika lupa password?',
        answer: 'Jika lupa password, Anda dapat menghubungi admin sistem atau bagian kemahasiswaan untuk melakukan reset password. Pastikan Anda membawa kartu mahasiswa sebagai identitas.',
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="relative w-full bg-gradient-to-b from-white to-red-50 py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-flex items-center rounded-full border border-red-600 px-3 py-1 text-sm font-semibold text-red-600">
                            <HelpCircle className="mr-1.5 h-4 w-4" />
                            FAQ
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter text-red-700 sm:text-5xl">
                            Pertanyaan yang Sering Diajukan
                        </h2>
                        <p className="text-muted-foreground max-w-[900px] text-sm md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Temukan jawaban untuk pertanyaan umum seputar PEMIRA
                        </p>
                    </div>
                </div>

                <div className="mx-auto mt-12 max-w-3xl space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-lg border border-red-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-red-50 sm:p-6"
                            >
                                <span className="pr-4 text-base font-semibold text-gray-800 sm:text-lg">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`h-5 w-5 flex-shrink-0 text-red-600 transition-transform duration-200 ${
                                        openIndex === index ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${
                                    openIndex === index ? 'max-h-96' : 'max-h-0'
                                }`}
                            >
                                <div className="border-t border-red-100 bg-red-50/50 p-4 sm:p-6">
                                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
