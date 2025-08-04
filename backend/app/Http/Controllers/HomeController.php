<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\Response;

class HomeController extends Controller {

    public function cats(): Response {
        return response()->json([
            'status' => 'ok',
        ]);
    }
}
