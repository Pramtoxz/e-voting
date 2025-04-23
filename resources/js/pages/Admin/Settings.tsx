import React from "react";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { PageProps } from "@/types";

interface SettingsProps extends PageProps {
  showVotingResults: string;
  countdownActive: string;
  countdownEndTime: string;
}

export default function Settings({
  showVotingResults,
  countdownActive,
  countdownEndTime,
}: SettingsProps) {
  // Form untuk pengaturan countdown
  const countdownForm = useForm({
    countdown_minutes: "",
  });

  // Form untuk force show results
  const forceShowForm = useForm({});

  // Simpan status settings dalam variabel untuk kemudahan
  const isCountdownActive = countdownActive === "1";
  const showResults = showVotingResults === "1";

  const formatEndTime = () => {
    if (!countdownEndTime) return "-";
    
    const endTime = new Date(countdownEndTime);
    return endTime.toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <AppLayout>
      <Head title="Pengaturan Hasil Voting" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">
              Pengaturan Hasil Voting
            </h2>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Status Saat Ini</CardTitle>
                <CardDescription>
                  Informasi tentang status tampilan hasil voting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Status Countdown:</p>
                    <p className={`text-lg font-bold ${isCountdownActive ? "text-green-600" : "text-gray-600"}`}>
                      {isCountdownActive ? "Aktif" : "Tidak Aktif"}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Status Hasil Voting:</p>
                    <p className={`text-lg font-bold ${showResults ? "text-green-600" : "text-gray-600"}`}>
                      {showResults ? "Ditampilkan" : "Disembunyikan"}
                    </p>
                  </div>
                </div>

                {isCountdownActive && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-800">
                    <p className="font-medium text-blue-800 dark:text-blue-300">Countdown Berakhir Pada:</p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{formatEndTime()}</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                      Hasil voting akan otomatis ditampilkan saat countdown berakhir.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Countdown</CardTitle>
                <CardDescription>
                  Atur durasi countdown untuk hasil voting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <label htmlFor="countdown_minutes" className="block text-sm font-medium mb-1">
                    Durasi Countdown (menit)
                  </label>
                  <input
                    id="countdown_minutes"
                    type="number"
                    min="1"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                    value={countdownForm.data.countdown_minutes}
                    onChange={(e) => countdownForm.setData("countdown_minutes", e.target.value)}
                    required
                  />
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md border border-yellow-100 dark:border-yellow-800 mb-4 text-sm">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">Catatan:</p>
                  <p className="text-yellow-700 dark:text-yellow-400">
                    Saat countdown aktif, hasil voting akan disembunyikan hingga countdown selesai.
                    Setelah countdown berakhir, hasil akan ditampilkan secara otomatis.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => countdownForm.post(route("settings.activate-countdown"))}
                  disabled={countdownForm.processing}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                >
                  Aktifkan Countdown
                </Button>
                
                <Button
                  onClick={() => forceShowForm.post(route("settings.force-show"))}
                  disabled={forceShowForm.processing}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700"
                >
                  Tampilkan Hasil Sekarang
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 