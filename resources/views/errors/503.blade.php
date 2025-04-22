<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Layanan Tidak Tersedia</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
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
        }

        .error-container {
            display: flex;
            flex-direction: column;
            min-height: 100%;
        }

        .error-header {
            background-color: #ef4444;
            color: white;
            padding: 1.5rem 1rem 2rem;
            text-align: center;
            position: relative;
            border-radius: 0 0 30px 30px;
            margin-bottom: 30px;
        }

        .error-code {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }

        .error-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
        }

        .error-message {
            font-size: 1rem;
            margin-bottom: 2rem;
            line-height: 1.5;
        }

        .error-quote {
            font-style: italic;
            padding: 0.75rem 0;
            margin: 0 auto;
            max-width: 85%;
            border-top: 1px solid rgba(255, 255, 255, 0.4);
            border-bottom: 1px solid rgba(255, 255, 255, 0.4);
            font-size: 0.95rem;
        }

        .error-content {
            background-color: white;
            flex: 1;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 1;
        }

        .garuda-container {
            margin-top: -60px;
            margin-bottom: 1.5rem;
            position: relative;
            z-index: 5;
        }

        .garuda-image {
            width: 150px;
            height: auto;
            filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1));
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
            100% {
                transform: translateY(0px);
            }
        }

        .pancasila-principles {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
            margin-bottom: 2rem;
        }

        .principle {
            background-color: #ffebeb;
            border-radius: 999px;
            padding: 0.5rem 1rem;
            text-align: center;
            color: #d61313;
            font-size: 0.9rem;
            transition: transform 0.3s ease, background-color 0.3s ease;
        }

        .principle:hover {
            transform: translateX(5px);
            background-color: #ffd7d7;
        }

        .developer-info {
            color: #0f5b8a;
            margin-top: auto;
            font-size: 0.9rem;
            text-align: center;
        }

        .copyright {
            color: #718096;
            margin-top: 0.75rem;
            font-size: 0.8rem;
            text-align: center;
        }

        @media (min-width: 640px) {
            .error-header {
                padding: 3rem 2rem 3rem;
                border-radius: 0 0 50px 50px;
                margin-bottom: 50px;
            }

            .error-code {
                font-size: 3.5rem;
            }

            .error-title {
                font-size: 2rem;
            }

            .error-message {
                font-size: 1.25rem;
                max-width: 36rem;
                margin-left: auto;
                margin-right: auto;
            }

            .garuda-container {
                margin-top: -80px;
            }

            .garuda-image {
                width: 200px;
            }

            .pancasila-principles {
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }
        }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="error-header">
            <div class="error-code">503</div>
            <div class="error-title">Layanan Tidak Tersedia</div>
            <div class="error-message">
                Mohon maaf, server kami sedang dalam pemeliharaan atau mengalami kelebihan beban.
                Kami akan segera kembali melayani Anda.
            </div>
            <div class="error-quote">
                "Kesabaran adalah kunci ketika kita menghadapi hambatan"
            </div>
        </div>
        
        <div class="error-content">
            <div class="garuda-container">
                <img 
                    src="{{ asset('images/garuda.webp') }}" 
                    alt="Garuda Pancasila" 
                    class="garuda-image"
                    onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjxwYXRoIGQ9Ik0xNTAgNzBDMTMwLjY3OCA3MCAxMTUgOTAuMTQ3IDExNSAxMTVDMTE1IDEzOS44NTMgMTMwLjY3OCAxNjAgMTUwIDE2MFYxODBIMTgwVjE2MEMxOTkuMzIyIDE2MCAyMTUgMTM5Ljg1MyAyMTUgMTE1QzIxNSA5MC4xNDcgMTk5LjMyMiA3MCAxODAgNzBIMTUwWiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMTM1IDIwNUgxNjVWMjIwQzE2NSAyMjUuNTIzIDE2MC41MjMgMjMwIDE1NSAyMzBDMTQ5LjQ3NyAyMzAgMTQ1IDIyNS41MjMgMTQ1IDIyMFYyMDVIMTM1WiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMTQwIDgwQzE0MCA4NS41MjI4IDE0NC40NzcgOTAgMTUwIDkwQzE1NS41MjMgOTAgMTYwIDg1LjUyMjggMTYwIDgwQzE2MCA3NC40NzcyIDE1NS41MjMgNzAgMTUwIDcwQzE0NC40NzcgNzAgMTQwIDc0LjQ3NzIgMTQwIDgwWiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMTMwIDEyMEMxMzAgMTI1LjUyMyAxMzQuNDc3IDEzMCAxNDAgMTMwQzE0NS41MjMgMTMwIDE1MCAxMjUuNTIzIDE1MCAxMjBDMTUwIDExNC40NzcgMTQ1LjUyMyAxMTAgMTQwIDExMEMxMzQuNDc3IDExMCAxMzAgMTE0LjQ3NyAxMzAgMTIwWiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMTUwIDEyMEMxNTAgMTI1LjUyMyAxNTQuNDc3IDEzMCAxNjAgMTMwQzE2NS41MjMgMTMwIDE3MCAxMjUuNTIzIDE3MCAxMjBDMTcwIDExNC40NzcgMTY1LjUyMyAxMTAgMTYwIDExMEMxNTQuNDc3IDExMCAxNTAgMTE0LjQ3NyAxNTAgMTIwWiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMTQwIDE0MEMxNDAgMTQ1LjUyMyAxNDQuNDc3IDE1MCAxNTAgMTUwQzE1NS41MjMgMTUwIDE2MCAxNDUuNTIzIDE2MCAxNDBDMTYwIDEzNC40NzcgMTU1LjUyMyAxMzAgMTUwIDEzMEMxNDQuNDc3IDEzMCAxNDAgMTM0LjQ3NyAxNDAgMTQwWiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNOTAgMTYwTDU1IDExNUwxMTUgMTQwTDkwIDE2MFoiIGZpbGw9IndoaXRlIi8+PHBhdGggZD0iTTIxMCAxNjBMMjQ1IDExNUwxODUgMTQwTDIxMCAxNjBaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik0xMDUgMTgwTDQ1IDE1MEwxMDAgMTcwTDEwNSAxODBaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik0xOTUgMTgwTDI1NSAxNTBMMjAwIDE3MEwxOTUgMTgwWiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=';"
                />
            </div>
            
            <div class="pancasila-principles">
                <div class="principle">Ketuhanan Yang Maha Esa</div>
                <div class="principle">Kemanusiaan Yang Adil dan Beradab</div>
                <div class="principle">Persatuan Indonesia</div>
                <div class="principle">Kerakyatan Yang Dipimpin Oleh Hikmat Kebijaksanaan</div>
                <div class="principle">Keadilan Sosial Bagi Seluruh Rakyat Indonesia</div>
            </div>
            
            <div class="developer-info">
                Dikembangkan oleh <strong>Pramudito Metra & Rafi Chandra</strong>
            </div>
            
            <div class="copyright">
                &copy; {{ date('Y') }} STMIK - AMIK JAYANUSA
            </div>
        </div>
    </div>
</body>
</html>