import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        const FORM_ID = process.env.GOOGLE_FORM_ID;
        const ENTRY_NAME = process.env.GOOGLE_FORM_ENTRY_NAME;
        const ENTRY_EMAIL = process.env.GOOGLE_FORM_ENTRY_EMAIL;
        const ENTRY_SUBJECT = process.env.GOOGLE_FORM_ENTRY_SUBJECT;
        const ENTRY_MESSAGE = process.env.GOOGLE_FORM_ENTRY_MESSAGE;

        if (!FORM_ID || !ENTRY_NAME || !ENTRY_EMAIL || !ENTRY_SUBJECT || !ENTRY_MESSAGE) {
            console.error('Missing Google Form configuration in environment variables');
            return NextResponse.json({ success: false, error: 'Configuration Error' }, { status: 500 });
        }

        const formUrl = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

        const formData = new URLSearchParams();
        formData.append(ENTRY_NAME as string, name);
        formData.append(ENTRY_EMAIL as string, email);
        formData.append(ENTRY_SUBJECT as string, subject);
        formData.append(ENTRY_MESSAGE as string, message);

        const response = await fetch(formUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Google Forms returns a successful response even if it's just the form page,
        // so we check if the fetch itself succeeded.
        if (response.ok) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: 'Form submission failed' }, { status: response.status });
        }
    } catch (error) {
        console.error('Contact Form Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
