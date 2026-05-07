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
            <div className="container px-4 md:px-6">
                <div className="flex flex-wrap justify-center gap-4 text-center">
                    {principles.map((principle, index) => (
                        <div key={index} className="rounded-full border border-red-100 bg-red-50 px-4 py-2">
                            <span className="font-semibold text-red-600">{principle}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
