import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Captcha } from '@/types/auth';
import { Calculator, CheckCircle } from 'lucide-react';

interface CaptchaDialogProps {
    open: boolean;
    captcha: Captcha;
    answer: string;
    error: string;
    onAnswerChange: (value: string) => void;
    onVerify: () => void;
    onCancel: () => void;
}

export default function CaptchaDialog({ open, captcha, answer, error, onAnswerChange, onVerify, onCancel }: CaptchaDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onCancel}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-red-600" />
                        Verifikasi CAPTCHA
                    </DialogTitle>
                    <DialogDescription>Selesaikan soal matematika berikut untuk melanjutkan</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="flex items-center justify-center gap-4 rounded-lg bg-red-50 p-6">
                        <span className="text-4xl font-bold text-red-600">{captcha.num1}</span>
                        <span className="text-3xl text-gray-600">+</span>
                        <span className="text-4xl font-bold text-red-600">{captcha.num2}</span>
                        <span className="text-3xl text-gray-600">=</span>
                        <span className="text-4xl font-bold text-gray-400">?</span>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Jawaban Anda</label>
                        <Input
                            type="number"
                            value={answer}
                            onChange={(e) => onAnswerChange(e.target.value)}
                            placeholder="Masukkan jawaban..."
                            className="text-center text-2xl"
                            autoFocus
                        />
                        {error && <p className="text-sm text-red-600">{error}</p>}
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Batal
                    </Button>
                    <Button type="button" onClick={onVerify} className="bg-red-600 hover:bg-red-700">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Verifikasi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
