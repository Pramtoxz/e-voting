export default function PancasilaPrinciples() {
    const principles = [
        'Ketuhanan Yang Maha Esa',
        'Kemanusiaan Yang Adil dan Beradab',
        'Persatuan Indonesia',
        'Kerakyatan Yang Dipimpin Oleh Hikmat Kebijaksanaan',
        'Keadilan Sosial Bagi Seluruh Rakyat Indonesia',
    ];

    return (
        <section className="w-full bg-white py-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-wrap justify-center gap-3 text-center sm:gap-4">
                    {principles.map((principle, index) => (
                        <div key={index} className="rounded-full border border-red-100 bg-red-50 px-3 py-2 sm:px-4">
                            <span className="text-xs font-semibold text-red-600 sm:text-sm">{principle}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
