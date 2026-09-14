import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)


def generate_proposal(customer_requirements, past_proposal):

    prompt = f"""
You are a professional business proposal writer.

Create a personalized project proposal based ONLY on the
customer requirements and the previous proposal template provided below.

CUSTOMER REQUIREMENTS:
{customer_requirements}

PREVIOUS PROPOSAL TEMPLATE:
{past_proposal}

Create the proposal using this structure:

1. Proposal Title
2. Client Information
3. Project Overview
4. Understanding of Requirements
5. Proposed Solution
6. Scope of Work
7. Key Features
8. Deliverables
9. Project Timeline
10. Budget
11. Assumptions
12. Next Steps

IMPORTANT RULES:

- Do not invent customer requirements.
- Do not invent features that were not requested.
- Do not invent a project timeline.
- Do not invent a final project price.
- If the customer mentioned a budget, mention it as
  "Client Budget" and do not treat it as a final quotation.
- If information is missing, write "To be finalized".
- Use professional business language.
- Customize the proposal for the customer.
- Do not mention that AI was used to create the proposal.

Return only the proposal text.
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )

    return response.text


if __name__ == "__main__":

    customer_requirements = """
Customer Name: Arun Kumar
Company: ABC Retail Technologies
Business Type: Online retail business

Pain Points:
- Existing e-commerce website is outdated and slow
- Customers face payment problems
- Orders are managed manually

Requirements:
- Modern responsive e-commerce website
- Product catalogue
- Customer registration and login
- Shopping cart
- Secure payment gateway
- Admin dashboard
- Order management

Timeline:
Approximately 6 weeks

Client Budget:
Around ₹2,00,000
"""

    with open(
        "data/past_proposals/ecommerce_proposal.txt",
        "r",
        encoding="utf-8"
    ) as file:

        past_proposal = file.read()

    proposal = generate_proposal(
        customer_requirements,
        past_proposal
    )

    print("\n===== GENERATED PROPOSAL =====\n")
    print(proposal)