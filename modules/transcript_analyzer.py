import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)


def analyze_transcript(transcript):

    prompt = f"""
You are an AI sales-call analysis assistant.

Analyze the following sales call transcript.

Extract the following information:

Customer Name:
Company:
Business Type:
Pain Points:
Requirements:
Features Requested:
Timeline:
Budget:
Additional Notes:

Do not invent information.
If something is not mentioned, write "Not specified".

SALES CALL TRANSCRIPT:
{transcript}
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )

    return response.text


if __name__ == "__main__":

    with open(
        "data/transcripts/sample_call.txt",
        "r",
        encoding="utf-8"
    ) as file:
        transcript = file.read()

    print("\n===== TRANSCRIPT BEING SENT =====\n")
    print(transcript)

    result = analyze_transcript(transcript)

    print("\n===== SALES CALL ANALYSIS =====\n")
    print(result)

