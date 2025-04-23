import React, { useEffect } from "react"
import { Head, Link, router } from "@inertiajs/react"
import { CheckCircle, Shield } from "lucide-react"
import Layout from "@/Layout/MainLayout"
import Button from "@/components/Button"

interface ThanksProps {
  vote: {
    username: string
    nomor_urut: string
    foto_bukti: string
    created_at: string
    kandidat: {
      nama: string
      nama_presiden: string
      nama_wakil: string
    }
  }
}

export default function Thanks({ vote }: ThanksProps) {
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.visit(route('kuesioner.index'), { 
        onFinish: () => console.log('Redirect ke kuesioner selesai')
      });
    }, 3000);

    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <>
      <Head title="Terima Kasih - PEMIRA 2025" />

      <main className="flex-1 bg-white">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="inline-flex items-center rounded-full border border-white bg-green-600/50 px-3 py-1 text-sm font-semibold">
                <CheckCircle className="mr-1 h-4 w-4" />
                <span>Pemilihan Berhasil</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Terima Kasih Atas Partisipasi Anda!
              </h1>
              <p className="max-w-[700px] text-green-100 md:text-xl/relaxed">
                Suara Anda telah berhasil direkam. Terima kasih telah berpartisipasi dalam PEMIRA 2025.
              </p>
              <p className="text-green-100 md:text-lg/relaxed">
                Halaman akan dialihkan ke kuesioner dalam 3 detik...
              </p>
            </div>
          </div>
        </div>

        <div className="container px-4 md:px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6">
              <div className="text-center mb-6">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold">Voting Berhasil!</h2>
                <p className="text-gray-600 mt-2">
                  Suara Anda telah tercatat dalam sistem PEMIRA 2025. Terima kasih telah menggunakan hak suara Anda.
                </p>
              </div>

              <div className="space-y-6 mt-8">
                {/* Detail Vote */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-3">Detail Pemilihan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Waktu Vote</p>
                      <p className="font-medium">{new Date(vote.created_at).toLocaleString('id-ID')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Kandidat Pilihan</p>
                      <p className="font-medium">No. Urut {vote.nomor_urut} - {vote.kandidat.nama}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Presiden</p>
                      <p className="font-medium">{vote.kandidat.nama_presiden}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Wakil Presiden</p>
                      <p className="font-medium">{vote.kandidat.nama_wakil}</p>
                    </div>
                  </div>
                </div>

                {/* Bukti Vote */}
                {vote.foto_bukti && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-3">Bukti Voting</h3>
                    <div className="relative w-full overflow-hidden rounded-lg">
                      <img src={`/storage/${vote.foto_bukti}`} alt="Bukti Voting" className="mx-auto" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Bukti voting Anda telah disimpan dalam sistem
                    </p>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-blue-600">Informasi</h3>
                      <p className="text-sm text-gray-600">
                        Pilihan Anda bersifat rahasia dan aman. Data ini hanya digunakan untuk keperluan
                        PEMIRA 2025 dan tidak akan dibagikan kepada pihak ketiga tanpa persetujuan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8 border-t border-gray-200 pt-6">
                <Link href={route('kuesioner.index')}>
                  <Button className="bg-red-700 hover:bg-red-800 text-white">
                    Ke Halaman Kuesioner
                  </Button>
                </Link>
              </div>
            </div>

            <div className="text-center mt-8 text-sm text-gray-500">
              <p>
                &copy; {new Date().getFullYear()} PEMIRA 2025 | Komisi Pemilihan Mahasiswa
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

Thanks.layout = (page: React.ReactNode) => <Layout children={page} title="Terima Kasih - PEMIRA 2025" /> 