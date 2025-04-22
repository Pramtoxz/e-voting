// "use client"

// import { useState } from "react"
// import { Head, useForm, usePage } from "@inertiajs/react"
// import { AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, Info, Shield, User, Vote } from "lucide-react"
// import Layout from "@/Layouts/MainLayout"
// import Button from "@/Components/Button"
// import Card from "@/Components/Card"
// import { router } from "@inertiajs/react"

// export default function Voting() {
//   const { auth, candidates } = usePage().props
//   const [selectedCandidate, setSelectedCandidate] = useState(null)
//   const [showConfirmation, setShowConfirmation] = useState(false)
//   const [votingStep, setVotingStep] = useState(1) // 1: Select, 2: Confirm, 3: Success

//   const { data, setData, post, processing, errors } = useForm({
//     candidate_id: null,
//   })

//   const handleSelectCandidate = (candidate) => {
//     setSelectedCandidate(candidate)
//     setData("candidate_id", candidate.id)
//   }

//   const handleConfirmVote = () => {
//     setVotingStep(2)
//     setShowConfirmation(true)
//   }

//   const handleCancelConfirmation = () => {
//     setVotingStep(1)
//     setShowConfirmation(false)
//   }

//   const handleSubmitVote = () => {
//     router.post(route("voting.store"), {
//       onSuccess: () => {
//         setVotingStep(3)
//         setShowConfirmation(false)
//       },
//     })
//   }

//   return (
//     <>
//       <Head title="Voting - PEMIRA 2025" />

//       <main className="flex-1 bg-white">
//         {/* Header Banner */}
//         <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-8 md:py-12">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center text-center space-y-4">
//               <div className="inline-flex items-center rounded-full border border-white bg-red-700/50 px-3 py-1 text-sm font-semibold">
//                 <Vote className="mr-1 h-4 w-4" />
//                 <span>Pemilihan Raya Mahasiswa 2025</span>
//               </div>
//               <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//                 {votingStep === 3 ? "Terima Kasih Atas Partisipasi Anda!" : "Berikan Suara Anda"}
//               </h1>
//               <p className="max-w-[700px] text-red-100 md:text-xl/relaxed">
//                 {votingStep === 3
//                   ? "Suara Anda telah berhasil direkam. Terima kasih telah berpartisipasi dalam PEMIRA 2025."
//                   : "Pilih kandidat yang menurut Anda paling tepat untuk memimpin organisasi kemahasiswaan periode 2025."}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Voting Steps */}
//         {votingStep !== 3 && (
//           <div className="container px-4 md:px-6 py-8">
//             <div className="max-w-3xl mx-auto">
//               <div className="flex items-center justify-between mb-8">
//                 <div className="flex flex-col items-center">
//                   <div
//                     className={`flex h-10 w-10 items-center justify-center rounded-full ${votingStep >= 1 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-500"}`}
//                   >
//                     <span className="font-bold">1</span>
//                   </div>
//                   <span className="text-sm mt-2">Pilih Kandidat</span>
//                 </div>
//                 <div className="flex-1 h-1 mx-4 bg-gray-200">
//                   <div
//                     className={`h-full ${votingStep >= 2 ? "bg-red-600" : "bg-gray-200"}`}
//                     style={{ width: votingStep >= 2 ? "100%" : "0%" }}
//                   ></div>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <div
//                     className={`flex h-10 w-10 items-center justify-center rounded-full ${votingStep >= 2 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-500"}`}
//                   >
//                     <span className="font-bold">2</span>
//                   </div>
//                   <span className="text-sm mt-2">Konfirmasi</span>
//                 </div>
//                 <div className="flex-1 h-1 mx-4 bg-gray-200">
//                   <div
//                     className={`h-full ${votingStep >= 3 ? "bg-red-600" : "bg-gray-200"}`}
//                     style={{ width: votingStep >= 3 ? "100%" : "0%" }}
//                   ></div>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <div
//                     className={`flex h-10 w-10 items-center justify-center rounded-full ${votingStep >= 3 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-500"}`}
//                   >
//                     <span className="font-bold">3</span>
//                   </div>
//                   <span className="text-sm mt-2">Selesai</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Voting Content */}
//         <div className="container px-4 md:px-6 py-8">
//           {votingStep === 1 && (
//             <div className="max-w-5xl mx-auto">
//               <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-8 flex items-start">
//                 <Info className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h3 className="font-semibold text-red-600">Informasi Penting</h3>
//                   <p className="text-sm text-gray-600">
//                     Pemilihan hanya dapat dilakukan satu kali dan tidak dapat diubah. Pastikan Anda memilih dengan
//                     bijak. Suara Anda bersifat rahasia dan aman.
//                   </p>
//                 </div>
//               </div>

//               <h2 className="text-2xl font-bold mb-6 text-center">Daftar Kandidat</h2>

//               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {candidates.map((candidate) => (
//                   <Card
//                     key={candidate.id}
//                     className={`overflow-hidden border-2 transition-all ${
//                       selectedCandidate?.id === candidate.id
//                         ? "border-red-600 shadow-md"
//                         : "border-gray-200 hover:border-red-200"
//                     }`}
//                     onClick={() => handleSelectCandidate(candidate)}
//                   >
//                     <div className="aspect-[4/3] relative">
//                       <div className="absolute inset-0 bg-gradient-to-b from-red-600/20 to-red-600/0 z-10"></div>
//                       <img
//                         src={route("placeholder", {
//                           width: 400,
//                           height: 300,
//                           text: `Kandidat ${candidate.id || "/placeholder.svg"}`,
//                         })}
//                         alt={candidate.nama}
//                         className="w-full h-full object-cover"
//                       />
//                       {selectedCandidate?.id === candidate.id && (
//                         <div className="absolute top-3 right-3 z-20">
//                           <div className="bg-red-600 text-white rounded-full p-1">
//                             <CheckCircle className="h-6 w-6" />
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                     <div className="p-6">
//                       <h3 className="text-xl font-bold text-red-600">{candidate.nama}</h3>
//                       <p className="text-sm text-muted-foreground mb-4">{candidate.fakultas}</p>
//                       <p className="mb-4 text-sm italic">"{candidate.visi}"</p>
//                       <Button
//                         variant={selectedCandidate?.id === candidate.id ? "default" : "outline"}
//                         className={`w-full ${
//                           selectedCandidate?.id === candidate.id
//                             ? "bg-red-600 text-white"
//                             : "border-red-600 text-red-600 hover:bg-red-50"
//                         }`}
//                         onClick={() => handleSelectCandidate(candidate)}
//                       >
//                         {selectedCandidate?.id === candidate.id ? "Kandidat Terpilih" : "Pilih Kandidat"}
//                       </Button>
//                     </div>
//                   </Card>
//                 ))}
//               </div>

//               <div className="mt-8 flex justify-center">
//                 <Button
//                   className="bg-red-600 hover:bg-red-700 text-white"
//                   size="lg"
//                   disabled={!selectedCandidate}
//                   onClick={handleConfirmVote}
//                 >
//                   Lanjutkan <ChevronRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           )}

//           {votingStep === 2 && (
//             <div className="max-w-3xl mx-auto">
//               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 flex items-start">
//                 <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h3 className="font-semibold text-yellow-600">Konfirmasi Pilihan Anda</h3>
//                   <p className="text-sm text-gray-600">
//                     Anda hanya dapat memilih satu kali dan tidak dapat mengubah pilihan setelah konfirmasi. Pastikan
//                     pilihan Anda sudah benar.
//                   </p>
//                 </div>
//               </div>

//               <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
//                 <div className="p-6">
//                   <h2 className="text-xl font-bold mb-6 text-center">Konfirmasi Pilihan</h2>

//                   <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
//                     <div className="w-full md:w-1/3 aspect-square relative rounded-lg overflow-hidden">
//                       <img
//                         src={route("placeholder", {
//                           width: 300,
//                           height: 300,
//                           text: `Kandidat ${selectedCandidate?.id || "/placeholder.svg"}`,
//                         })}
//                         alt={selectedCandidate?.nama}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="w-full md:w-2/3">
//                       <h3 className="text-2xl font-bold text-red-600">{selectedCandidate?.nama}</h3>
//                       <p className="text-gray-600 mb-2">{selectedCandidate?.fakultas}</p>

//                       <div className="mt-4">
//                         <h4 className="font-semibold text-gray-800">Visi:</h4>
//                         <p className="text-gray-600 mb-4 italic">"{selectedCandidate?.visi}"</p>

//                         <h4 className="font-semibold text-gray-800">Misi:</h4>
//                         <ul className="list-disc list-inside text-gray-600 space-y-1">
//                           {selectedCandidate?.misi.map((item, index) => (
//                             <li key={index}>{item}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="border-t border-gray-200 pt-6">
//                     <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//                       <div className="flex items-center text-gray-600">
//                         <Shield className="h-5 w-5 mr-2" />
//                         <span className="text-sm">Suara Anda dijamin kerahasiaannya</span>
//                       </div>

//                       <div className="flex gap-3">
//                         <Button
//                           variant="outline"
//                           className="border-gray-300 text-gray-700"
//                           onClick={handleCancelConfirmation}
//                         >
//                           <ChevronLeft className="mr-2 h-4 w-4" /> Kembali
//                         </Button>
//                         <Button
//                           className="bg-red-600 hover:bg-red-700 text-white"
//                           onClick={handleSubmitVote}
//                           disabled={processing}
//                         >
//                           {processing ? "Memproses..." : "Konfirmasi Pilihan"}
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {votingStep === 3 && (
//             <div className="max-w-3xl mx-auto">
//               <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
//                 <div className="p-8 text-center">
//                   <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <CheckCircle className="h-10 w-10 text-green-600" />
//                   </div>

//                   <h2 className="text-2xl font-bold mb-4">Suara Anda Telah Berhasil Direkam</h2>
//                   <p className="text-gray-600 mb-6">
//                     Terima kasih telah berpartisipasi dalam Pemilihan Raya Mahasiswa 2025. Suara Anda sangat berarti
//                     untuk masa depan kampus kita.
//                   </p>

//                   <div className="bg-gray-50 rounded-lg p-4 mb-6 inline-block">
//                     <div className="flex items-center justify-center">
//                       <User className="h-5 w-5 text-gray-500 mr-2" />
//                       <span className="text-gray-700">
//                         ID Pemilih: <span className="font-mono font-medium">{auth.user.nim}</span>
//                       </span>
//                     </div>
//                   </div>

//                   <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                     <Button href={route("voting.results")} className="bg-red-600 hover:bg-red-700 text-white">
//                       Lihat Hasil Sementara
//                     </Button>
//                     <Button
//                       href={route("home")}
//                       variant="outline"
//                       className="border-red-600 text-red-600 hover:bg-red-50"
//                     >
//                       Kembali ke Beranda
//                     </Button>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-8 bg-red-50 border border-red-100 rounded-lg p-4 flex items-start">
//                 <Info className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h3 className="font-semibold text-red-600">Informasi</h3>
//                   <p className="text-sm text-gray-600">
//                     Hasil akhir pemilihan akan diumumkan pada tanggal 3 Maret 2025 melalui website resmi PEMIRA dan
//                     media sosial kampus.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </>
//   )
// }

// Voting.layout = (page) => <Layout children={page} title="Voting - PEMIRA 2025" />
