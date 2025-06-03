<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OrderModel as Order;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfirmation;

class OrderController extends Controller {

    public function storeInfo(Request $request) {
        $data = $request->validate([
            'product' => 'required|array',
            'customer' => 'required|array',
            'status' => 'required|in:approved,declined,error'
        ]);

        $order = Order::create([
            'order_id' => Str::uuid(),
            'product' => json_encode($data['product']),
            'customer' => json_encode($data['customer']),
            'status' => $data['status']
        ]);

        Mail::to($data['customer']['email'])->send(new OrderConfirmation($order));

        return response()->json([
            'message' => 'Order saved successfully',
            'order_id' => $order->order_id
        ]);
    }
}
