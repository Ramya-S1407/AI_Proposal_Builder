import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


PROPOSAL_FOLDER = "data/past_proposals"


def load_proposals():

    proposals = {}

    for filename in os.listdir(PROPOSAL_FOLDER):

        if filename.endswith(".txt"):

            filepath = os.path.join(PROPOSAL_FOLDER, filename)

            with open(filepath, "r", encoding="utf-8") as file:
                proposals[filename] = file.read()

    return proposals


def find_similar_proposal(requirements):

    proposals = load_proposals()

    proposal_names = list(proposals.keys())
    proposal_texts = list(proposals.values())

    documents = [requirements] + proposal_texts

    vectorizer = TfidfVectorizer(stop_words="english")

    vectors = vectorizer.fit_transform(documents)

    similarities = cosine_similarity(
        vectors[0:1],
        vectors[1:]
    )[0]

    best_index = similarities.argmax()

    return proposal_names[best_index], similarities[best_index]


if __name__ == "__main__":

    test_requirements = """
    We need a modern and responsive e-commerce website.
    The system should have a product catalogue,
    customer registration and login,
    shopping cart,
    secure payment gateway,
    order management and admin dashboard.
    """

    proposal, score = find_similar_proposal(test_requirements)

    print("\n===== PROPOSAL RETRIEVAL =====")
    print("Most Similar Proposal:", proposal)
    print("Similarity Score:", round(score, 2))