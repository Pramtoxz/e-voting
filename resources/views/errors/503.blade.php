<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Pemilihan Segera Dimulai</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body, html {
            font-family: 'Instrument Sans', sans-serif;
            height: 100%;
            width: 100%;
            background: #991b1b;
            color: white;
            touch-action: manipulation;
            overflow-x: hidden;
        }

        .container {
            display: flex;
            flex-direction: column;
            min-height: 100%;
            padding: 1rem;
        }

        .lock-icon {
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 2rem;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }

        .header {
            text-align: center;
            padding: 2rem 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .title {
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 1rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
        }

        .timer-container {
            width: 100%;
            padding: 1rem;
            border-radius: 1rem;
            background: rgba(0,0,0,0.2);
            margin: 1.5rem 0;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .timer-title {
            text-align: center;
            margin-bottom: 0.5rem;
            font-weight: 600;
            font-size: 1.1rem;
            color: rgba(255,255,255,0.9);
        }

        .timer {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
        }

        .timer-block {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 60px;
        }

        .timer-number {
            background: rgba(255,255,255,0.95);
            color: #991b1b;
            font-size: 1.8rem;
            font-weight: 700;
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.6rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            position: relative;
            overflow: hidden;
        }

        .timer-number::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 1px;
            background: rgba(0,0,0,0.1);
        }

        .timer-label {
            font-size: 0.75rem;
            margin-top: 0.3rem;
            color: rgba(255,255,255,0.8);
            font-weight: 500;
        }

        .countdown-info {
            margin-top: 1rem;
            text-align: center;
            font-size: 0.9rem;
            color: rgba(255,255,255,0.9);
            animation: fade 2s infinite;
        }

        @keyframes fade {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
        }

        .garuda-container {
            position: relative;
            width: 140px;
            height: 140px;
            margin: 1rem auto 1.5rem;
        }

        .garuda-glow {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%);
            animation: glow 3s ease-in-out infinite;
        }

        @keyframes glow {
            0%, 100% { transform: scale(0.9); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 1; }
        }

        .garuda-image {
            position: relative;
            z-index: 2;
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: drop-shadow(0 0 8px rgba(255,255,255,0.3));
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .content {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .info-box {
            background: rgba(255,255,255,0.1);
            border-radius: 1rem;
            padding: 1rem;
            margin-bottom: 1.5rem;
            border-left: 4px solid rgba(255,255,255,0.4);
        }

        .info-box h3 {
            color: white;
            margin-bottom: 0.5rem;
            font-size: 1rem;
            display: flex;
            align-items: center;
        }

        .info-box h3::before {
            content: '⚠️';
            margin-right: 0.5rem;
        }

        .info-box p {
            color: rgba(255,255,255,0.9);
            font-size: 0.9rem;
            line-height: 1.4;
        }

        .tips-list {
            padding-left: 1.5rem;
            margin-top: 0.5rem;
        }

        .tips-list li {
            margin-bottom: 0.3rem;
            font-size: 0.85rem;
        }

        .developer-info {
            margin-top: auto;
            padding-top: 1rem;
            font-size: 0.8rem;
            text-align: center;
            color: rgba(255,255,255,0.7);
        }

        .buttons {
            display: flex;
            gap: 0.5rem;
            margin-top: 1.5rem;
        }

        .button {
            flex: 1;
            background: white;
            color: #991b1b;
            border: none;
            padding: 0.8rem 1rem;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 0.9rem;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            transition: transform 0.2s;
        }

        .button:active {
            transform: scale(0.98);
        }

        .outline-button {
            flex: 1;
            background: transparent;
            color: white;
            border: 1px solid rgba(255,255,255,0.4);
            padding: 0.8rem 1rem;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 0.9rem;
            text-align: center;
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            transition: background 0.2s;
        }

        .outline-button:active {
            background: rgba(255,255,255,0.1);
        }

        /* Audio controls */
        .audio-control {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
            background: rgba(0,0,0,0.2);
            padding: 0.5rem;
            border-radius: 8px;
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
        }

        .audio-btn {
            background: white;
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #991b1b;
            font-size: 1rem;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .audio-label {
            font-size: 0.8rem;
            color: rgba(255,255,255,0.9);
        }
        
        .audio-indicator {
            display: inline-flex;
            gap: 2px;
            height: 16px;
            align-items: center;
        }
        
        .audio-bar {
            width: 3px;
            background-color: white;
            border-radius: 1px;
            height: 100%;
            animation: sound-wave 1s infinite;
        }
        
        .audio-bar:nth-child(1) { animation-delay: 0.1s; height: 30%; }
        .audio-bar:nth-child(2) { animation-delay: 0.2s; height: 60%; }
        .audio-bar:nth-child(3) { animation-delay: 0.3s; height: 100%; }
        .audio-bar:nth-child(4) { animation-delay: 0.4s; height: 70%; }
        .audio-bar:nth-child(5) { animation-delay: 0.5s; height: 50%; }
        
        @keyframes sound-wave {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(0.6); }
        }
        
        .hidden {
            display: none;
        }

        @media (orientation: landscape) {
            .container {
                padding: 0.5rem 2rem;
            }
            
            .garuda-container {
                width: 120px;
                height: 120px;
                margin: 0.5rem auto 1rem;
            }
            
            .timer-container {
                margin: 1rem 0;
            }
        }
        
        /* Overlay untuk memaksa interaksi */
        #interactionOverlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
            animation: fadeIn 0.5s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        #interactionOverlay h2 {
            font-size: 1.4rem;
            margin-bottom: 1rem;
        }
        
        #interactionOverlay p {
            font-size: 1rem;
            margin-bottom: 2rem;
            max-width: 80%;
        }
        
        #interactionButton {
            background-color: white;
            color: #991b1b;
            border: none;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            transform: scale(1);
            transition: transform 0.2s;
        }
        
        #interactionButton:hover {
            transform: scale(1.05);
        }
    </style>
</head>
<body>
    <!-- Overlay untuk memaksa interaksi -->
    <div id="interactionOverlay">
        <h2>Pemira Jayanusa 2025</h2>
        <p>Mari bersama wujudkan demokrasi yang jujur dan transparan untuk masa depan yang lebih baik</p>
        <button id="interactionButton">Masuk ke Portal</button>
    </div>

    <div class="container">
        <div class="lock-icon">🔓</div>

        <div class="header">
            <div class="title">Pemilihan Segera Dimulai!</div>
            <div class="subtitle">PEMIRA 2025 akan dibuka sebentar lagi</div>
            
            <!-- Audio controls -->
            <div class="audio-control">
                <button id="playPauseBtn" class="audio-btn">⏸️</button>
                <span class="audio-label">Indonesia Raya</span>
                <div id="audioIndicator" class="audio-indicator">
                    <div class="audio-bar"></div>
                    <div class="audio-bar"></div>
                    <div class="audio-bar"></div>
                    <div class="audio-bar"></div>
                    <div class="audio-bar"></div>
                </div>
            </div>
            
            <div class="garuda-container">
                <div class="garuda-glow"></div>
                <img 
                    src="{{ asset('images/garuda.webp') }}" 
                    alt="Garuda Pancasila" 
                    class="garuda-image"
                    onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjxwYXRoIGQ9Ik0xNTAgNzBDMTMwLjY3OCA3MCAxMTUgOTAuMTQ3IDExNSAxMTVDMTE1IDEzOS44NTMgMTMwLjY3OCAxNjAgMTUwIDE2MFYxODBIMTgwVjE2MEMxOTkuMzIyIDE2MCAyMTUgMTM5Ljg1MyAyMTUgMTE1QzIxNSA5MC4xNDcgMTk5LjMyMiA3MCAxODAgNzBIMTUwWiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMTM1IDIwNUgxNjVWMjIwQzE2NSAyMjUuNTIzIDE2MC41MjMgMjMwIDE1NSAyMzBDMTQ5LjQ3NyAyMzAgMTQ1IDIyNS41MjMgMTQ1IDIyMFYyMDVIMTM1WiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMTQwIDgwQzE0MCA4NS41MjI4IDE0NC40NzcgOTAgMTUwIDkwQzE1NS41MjMgOTAgMTYwIDg1LjUyMjggMTYwIDgwQzE2MCA3NC40NzcyIDE1NS41MjMgNzAgMTUwIDcwQzE0NC40NzcgNzAgMTQwIDc0LjQ3NzIgMTQwIDgwWiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMTMwIDEyMEMxMzAgMTI1LjUyMyAxMzQuNDc3IDEzMCAxNDAgMTMwQzE0NS41MjMgMTMwIDE1MCAxMjUuNTIzIDE1MCAxMjBDMTUwIDExNC40NzcgMTQ1LjUyMyAxMTAgMTQwIDExMEMxMzQuNDc3IDExMCAxMzAgMTE0LjQ3NyAxMzAgMTIwWiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMTUwIDEyMEMxNTAgMTI1LjUyMyAxNTQuNDc3IDEzMCAxNjAgMTMwQzE2NS41MjMgMTMwIDE3MCAxMjUuNTIzIDE3MCAxMjBDMTcwIDExNC40NzcgMTY1LjUyMyAxMTAgMTYwIDExMEMxNTQuNDc3IDExMCAxNTAgMTE0LjQ3NyAxNTAgMTIwWiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMTQwIDE0MEMxNDAgMTQ1LjUyMyAxNDQuNDc3IDE1MCAxNTAgMTUwQzE1NS41MjMgMTUwIDE2MCAxNDUuNTIzIDE2MCAxNDBDMTYwIDEzNC40NzcgMTU1LjUyMyAxMzAgMTUwIDEzMEMxNDQuNDc3IDEzMCAxNDAgMTM0LjQ3NyAxNDAgMTQwWiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNOTAgMTYwTDU1IDExNUwxMTUgMTQwTDkwIDE2MFoiIGZpbGw9IndoaXRlIi8+PHBhdGggZD0iTTIxMCAxNjBMMjQ1IDExNUwxODUgMTQwTDIxMCAxNjBaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik0xMDUgMTgwTDQ1IDE1MEwxMDAgMTcwTDEwNSAxODBaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik0xOTUgMTgwTDI1NSAxNTBMMjAwIDE3MEwxOTUgMTgwWiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=';"
                />
            </div>
        </div>
        
        <div class="timer-container">
            <div class="timer-title">Waktu Menuju Pemilihan:</div>
            <div class="timer">
                <div class="timer-block">
                    <div class="timer-number" id="hour-display">02</div>
                    <div class="timer-label">Jam</div>
                </div>
                <div class="timer-block">
                    <div class="timer-number" id="minute-display">00</div>
                    <div class="timer-label">Menit</div>
                </div>
                <div class="timer-block">
                    <div class="timer-number" id="second-display">00</div>
                    <div class="timer-label">Detik</div>
                </div>
            </div>
            <div class="countdown-info">Halaman akan otomatis disegarkan saat waktu habis</div>
        </div>
        
        <div class="content">
            <div class="info-box">
                <h3>Persiapkan Diri Anda</h3>
                <p>Pastikan Anda telah mempersiapkan hal-hal berikut untuk mengikuti pemilihan:</p>
                <ul class="tips-list">
                    <li>Nomor BP/NIM Anda</li>
                    <li>Username dan password akun</li>
                    <li>Pastikan koneksi internet stabil</li>
                </ul>
            </div>
        
            
            <div class="developer-info">
                &copy; {{ date('Y') }}
                Developed by Pramudito Metra & Rafi Chandra
            </div>
        </div>
    </div>

    <script>
        // Audio dan timer functionality
        document.addEventListener('DOMContentLoaded', function() {
            const playPauseBtn = document.getElementById('playPauseBtn');
            const audioIndicator = document.getElementById('audioIndicator');
            const interactionOverlay = document.getElementById('interactionOverlay');
            const interactionButton = document.getElementById('interactionButton');
            let audio = null;
            
            // Membuat elemen audio
            try {
                audio = new Audio();
                audio.src = '/audio/indonesia.mp3';
                audio.loop = true;
            } catch(e) {
                console.error('Error creating audio element:', e);
            }
            
            // Fungsi untuk memulai audio
            function startAudio() {
                if (!audio) {
                    console.error('Audio element not available');
                    return Promise.reject('Audio element not available');
                }
                
                return audio.play()
                    .then(() => {
                        playPauseBtn.textContent = '⏸️';
                        audioIndicator.classList.remove('hidden');
                        console.log('Audio started playing');
                    })
                    .catch(e => {
                        console.error('Audio play failed:', e);
                    });
            }
            
            // Event listener untuk overlay button
            interactionButton.addEventListener('click', function() {
                // Sembunyikan overlay
                interactionOverlay.style.display = 'none';
                
                // Mulai audio
                startAudio();
            });
            
            // Click handler untuk tombol play/pause
            playPauseBtn.addEventListener('click', function() {
                if (!audio) {
                    console.error('Audio element not available');
                    return;
                }
                
                if (audio.paused) {
                    startAudio();
                } else {
                    audio.pause();
                    playPauseBtn.textContent = '▶️';
                    audioIndicator.classList.add('hidden');
                    console.log('Audio paused');
                }
            });
            
            // Inisialisasi countdown timer
            const countDownDate = new Date().getTime() + (2 * 60 * 60 * 1000);
            const hourDisplay = document.getElementById('hour-display');
            const minuteDisplay = document.getElementById('minute-display');
            const secondDisplay = document.getElementById('second-display');
            
            if (!hourDisplay || !minuteDisplay || !secondDisplay) {
                console.error('Timer elements not found');
                return;
            }
            
            // Update countdown setiap 1 detik
            const timer = setInterval(function() {
                const now = new Date().getTime();
                const distance = countDownDate - now;
                
                // Kalkulasi waktu
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                // Tampilkan hasil dengan pengecekan null
                if (hourDisplay) hourDisplay.textContent = hours.toString().padStart(2, "0");
                if (minuteDisplay) minuteDisplay.textContent = minutes.toString().padStart(2, "0");
                if (secondDisplay) secondDisplay.textContent = seconds.toString().padStart(2, "0");
                
                // Jika countdown selesai
                if (distance < 0) {
                    clearInterval(timer);
                    if (hourDisplay) hourDisplay.textContent = "00";
                    if (minuteDisplay) minuteDisplay.textContent = "00";
                    if (secondDisplay) secondDisplay.textContent = "00";
                    
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000);
                }
            }, 1000);
        });
    </script>
</body>
</html>