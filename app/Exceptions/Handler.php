<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Inertia\Inertia;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $e
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $e)
    {
        // Jika request adalah Inertia, gunakan file TSX untuk error
        if ($request->header('X-Inertia')) {
            if ($e instanceof HttpException) {
                $statusCode = $e->getStatusCode();

                if (file_exists(resource_path("js/pages/errors/{$statusCode}.tsx"))) {
                    return Inertia::render("errors/{$statusCode}");
                }
            }
        }

        // Gunakan handler default untuk permintaan non-Inertia
        return parent::render($request, $e);
    }
} 