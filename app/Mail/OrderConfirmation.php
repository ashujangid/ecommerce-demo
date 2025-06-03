<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\OrderModel as Order;

class OrderConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $order; // make it public to access in blade

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Order Confirmation - ' . $this->order->order_id)
            ->view('emails.order');
    }
}
