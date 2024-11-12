import { NextRequest, NextResponse } from "next/server";
import openai from "@/modules/openai";

export async function POST(req: NextRequest) {
    const { inputText } = await req.json();

    try {
      const response = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        temperature: 0.9,
        best_of: 6,
        prompt: `#
        **הודעה לתיקון**:
        
        "${inputText}"

 תתקן את ההודעה הבאה כך שתהיה מובנת וקלה לקריאה עבור אנשים בתפקוד נמוך על הרצף האוטיסטי. תעשה את זה לפי ההנחיות הבאות:

- **שפה פשוטה וברורה**: השתמש במילים יומיומיות ומשפטים קצרים.
- **הימנע ממטאפורות, סלנג וביטויים דו-משמעיים**.
- **מבנה מסודר**: חלק את המידע לכותרות, סעיפים ורשימות.
- **הנחיות ברורות**: אם נדרשות פעולות, פרט אותן בשלבים.
- **הדגשת מידע חשוב**: השתמש בהדגשה או באימוג'ים כדי לסמן נקודות מפתח.
- **הימנע מהצפת מידע**: התמקד רק בנושאים החשובים.

---

  תחזיר בסוף את ההודעה המתוקנת בלבד ללא שום דבר שקשור להנחיות
  תחזיר את ההודעה בפורמט שנראה טוב בטקסט .md
  תשתמש בכמה שפחות טוקנים ותספק תשובה כמה שיותר טובה

`,
        max_tokens: 1024,
      });
  
      const text = response.choices[0].text.trim();

      return NextResponse.json({ text }, { status: 200 });
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return NextResponse.json({ message: 'Error generating response' }, { status: 500 });
    }
}
