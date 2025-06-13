# Plan Testów dla Projektu 10x-cards

**Wersja dokumentu:** 1.0
**Data utworzenia:** 2024-07-26
**Autor:** Inżynier QA (AI)

---

## 1. Wprowadzenie i cele testowania

### 1.1. Wprowadzenie
Niniejszy dokument opisuje kompleksowy plan testów dla aplikacji `10x-cards`, której głównym celem jest wspomaganie użytkowników w tworzeniu i nauce z wykorzystaniem fiszek edukacyjnych. Aplikacja wykorzystuje nowoczesny stos technologiczny, w tym Astro, React, Supabase oraz zewnętrzną usługę AI (OpenRouter.ai) do automatycznego generowania fiszek na podstawie tekstu dostarczonego przez użytkownika.

Plan ten określa zakres, podejście, zasoby i harmonogram działań testowych, mających na celu zapewnienie wysokiej jakości, bezpieczeństwa i niezawodności produktu końcowego.

### 1.2. Cele testowania
Główne cele procesu testowego to:
- **Weryfikacja funkcjonalności:** Potwierdzenie, że wszystkie funkcje opisane w dokumentacji wymagań produktu (`docs/prd.md`) działają zgodnie z założeniami.
- **Zapewnienie jakości:** Identyfikacja i zaraportowanie defektów w celu ich naprawy przed wdrożeniem produkcyjnym.
- **Ocena wydajności:** Weryfikacja, czy aplikacja działa z akceptowalną szybkością, zwłaszcza w kontekście komunikacji z zewnętrznymi usługami AI.
- **Identyfikacja ryzyk bezpieczeństwa:** Wykrycie potencjalnych luk bezpieczeństwa, w szczególności związanych z izolacją danych użytkowników i autoryzacją.
- **Sprawdzenie użyteczności:** Upewnienie się, że interfejs użytkownika jest intuicyjny i przyjazny w obsłudze.
- **Weryfikacja integracji:** Potwierdzenie poprawnej komunikacji pomiędzy komponentami systemu (frontend, backend, baza danych, usługi zewnętrzne).

---

## 2. Zakres testów

### 2.1. Funkcjonalności objęte testami
- Rejestracja i logowanie użytkowników (gdy zostanie zaimplementowane).
- Proces generowania fiszek przez AI na podstawie tekstu (`POST /api/generations`).
- Walidacja danych wejściowych dla endpointów API.
- Operacje CRUD (Tworzenie, Odczyt, Aktualizacja, Usuwanie) na fiszkach.
- Zapisywanie metadanych i logów błędów związanych z generowaniem fiszek.
- Wyświetlanie i interakcja z komponentami UI (React).
- Poprawność renderowania stron statycznych i serwerowych (Astro).

### 2.2. Funkcjonalności wyłączone z testów (w tej fazie)
- Testy obciążeniowe na dużą skalę.
- Testowanie samego algorytmu Spaced Repetition (zakładamy, że zewnętrzna biblioteka działa poprawnie).
- Funkcjonalności opisane jako "Poza zakresem MVP" w `docs/prd.md`.

---

## 3. Typy testów

### 3.1. Testy jednostkowe (Unit Tests)
- **Cel:** Weryfikacja poprawności działania pojedynczych komponentów (funkcji, klas, komponentów React) w izolacji.
- **Obszary:**
    - Funkcje pomocnicze (`src/lib/utils.ts`).
    - Logika komponentów React (UI i hooks).
    - Metody wewnątrz `GenerationService`, z zamockowanymi zależnościami (Supabase, OpenRouter).

### 3.2. Testy integracyjne (Integration Tests)
- **Cel:** Sprawdzenie poprawności współpracy między różnymi modułami aplikacji.
- **Obszary:**
    - Integracja komponentów React z usługami frontendowymi.
    - Współdziałanie `GenerationService` z klientem Supabase (na testowej bazie danych).
    - Logika endpointów API w Astro, weryfikująca przepływ od żądania do odpowiedzi, z mockowaniem usług zewnętrznych.

### 3.3. Testy End-to-End (E2E)
- **Cel:** Symulacja rzeczywistych scenariuszy użytkowania aplikacji z perspektywy użytkownika końcowego.
- **Obszary:**
    - Pełny przepływ generowania fiszek: od wklejenia tekstu w formularzu, przez wysłanie żądania, aż po wyświetlenie propozycji fiszek.
    - Ręczne tworzenie, edycja i usuwanie fiszki.
    - Proces logowania i rejestracji (po implementacji).

### 3.4. Testy API
- **Cel:** Bezpośrednia weryfikacja endpointów API pod kątem logiki, walidacji, obsługi błędów i kontraktu.
- **Obszary:**
    - Wszystkie endpointy zdefiniowane w `docs/api-plan.md`.
    - Testowanie przypadków brzegowych (np. niepoprawne dane, brak autoryzacji).
    - Weryfikacja poprawności kodów statusu HTTP i formatu odpowiedzi.

### 3.5. Testy bezpieczeństwa
- **Cel:** Identyfikacja i eliminacja luk w zabezpieczeniach aplikacji.
- **Obszary:**
    - **Priorytet krytyczny:** Testowanie izolacji danych. Sprawdzenie, czy użytkownik A nie ma dostępu do danych użytkownika B. Weryfikacja polityk Row-Level Security (RLS) w Supabase, gdy tylko zostaną ponownie włączone.
    - Walidacja danych wejściowych pod kątem ataków (np. SQL Injection, XSS).
    - Weryfikacja, czy klucze API i inne wrażliwe dane nie są publicznie dostępne w kodzie frontendowym lub hardkodowane.

### 3.6. Testy wydajnościowe
- **Cel:** Ocena szybkości i responsywności aplikacji pod obciążeniem.
- **Obszary:**
    - Czas odpowiedzi endpointu `/api/generations`, który zależy od zewnętrznego serwisu AI.
    - Czas ładowania kluczowych stron aplikacji.

### 3.7. Testy wizualnej regresji
- **Cel:** Automatyczne wykrywanie niezamierzonych zmian w interfejsie użytkownika.
- **Obszary:**
    - Kluczowe komponenty UI z biblioteki `shadcn/ui`.
    - Główne layouty i widoki aplikacji.

---

## 4. Scenariusze testowe dla kluczowych funkcjonalności

| ID | Funkcjonalność | Scenariusz | Oczekiwany rezultat | Priorytet |
|----|----------------|------------|---------------------|-----------|
| TC-01 | Generowanie fiszek (Happy Path) | Użytkownik wkleja poprawny tekst (1000-10000 znaków) i klika "Generuj". | Aplikacja wyświetla propozycje fiszek. W bazie danych (`generations`) zostaje utworzony nowy rekord. | Krytyczny |
| TC-02 | Generowanie fiszek (Walidacja) | Użytkownik wkleja tekst krótszy niż 1000 znaków. | Wyświetlany jest komunikat błędu o niepoprawnej długości tekstu. Żądanie nie jest wysyłane. | Wysoki |
| TC-03 | Generowanie fiszek (Błąd API) | Serwis AI zwraca błąd 500 lub przekracza timeout. | Użytkownik widzi stosowny komunikat o błędzie. W tabeli `generation_error_logs` pojawia się nowy wpis. | Wysoki |
| TC-04 | Zarządzanie fiszkami (Tworzenie) | Użytkownik ręcznie tworzy nową fiszkę. | Fiszka jest widoczna na liście i zostaje zapisana w bazie danych z `source: 'manual'`. | Wysoki |
| TC-05 | Zarządzanie fiszkami (Edycja) | Użytkownik edytuje istniejącą fiszkę. | Zmiany są zapisywane w bazie, a pole `updated_at` jest aktualizowane. | Średni |
| TC-06 | Zarządzanie fiszkami (Usuwanie) | Użytkownik usuwa fiszkę. | Fiszka znika z listy i zostaje usunięta z bazy danych. | Średni |
| TC-07 | Bezpieczeństwo (Izolacja danych) | Użytkownik 1 (zalogowany) próbuje uzyskać dostęp do fiszek użytkownika 2 przez bezpośrednie wywołanie API. | Żądanie zostaje odrzucone z błędem autoryzacji (403/404). | Krytyczny |

---

## 5. Środowisko testowe

| Typ środowiska | Opis | Cel |
|----------------|------|-----|
| **Lokalne (Development)** | Komputer dewelopera z lokalnie uruchomioną aplikacją i instancją Supabase (local dev). | Testy jednostkowe, debugowanie, wstępne testy manualne. |
| **Staging** | Środowisko odzwierciedlające produkcję. Dedykowany serwer, oddzielna instancja Supabase. Zintegrowane z prawdziwym (lub testowym) API OpenRouter. | Testy integracyjne, E2E, API, UAT (User Acceptance Testing), testy wydajnościowe. |
| **Produkcja** | Środowisko dostępne dla użytkowników końcowych. | Ograniczone testy weryfikacyjne (smoke tests) po wdrożeniu. |

---

## 6. Narzędzia do testowania

| Typ testu | Proponowane narzędzie |
|-------------------------|---------------------------|
| Jednostkowe / Integracyjne | Vitest, React Testing Library |
| E2E | Playwright lub Cypress |
| API | Postman lub Insomnia (dla testów manualnych), wbudowane narzędzia w Playwright/Cypress dla automatyzacji |
| Wizualna regresja | Chromatic lub Percy.io |
| Zarządzanie testami | (Opcjonalnie) TestRail, Zephyr lub wtyczki do Jiry |
| Raportowanie błędów | GitHub Issues |

---

## 7. Harmonogram testów

Testowanie powinno być procesem ciągłym, zintegrowanym z cyklem rozwoju oprogramowania (CI/CD).
- **Sprint Development:** Testy jednostkowe i integracyjne pisane są równolegle z kodem.
- **Przed końcem sprintu/wydania:** Przeprowadzana jest pełna regresja (testy E2E, API) na środowisku stagingowym.
- **Po wdrożeniu:** Wykonywane są testy typu "smoke" na środowisku produkcyjnym.

---

## 8. Kryteria akceptacji testów

### 8.1. Kryteria wejścia
- Dostępna jest stabilna wersja aplikacji na środowisku testowym.
- Dostępna jest dokumentacja techniczna i funkcjonalna.
- Wszystkie testy jednostkowe przechodzą pomyślnie.

### 8.2. Kryteria wyjścia (Definition of Done dla testów)
- 100% krytycznych i wysokich scenariuszy testowych zostało wykonanych i zakończyło się sukcesem.
- Brak otwartych błędów o priorytecie krytycznym lub wysokim.
- Pokrycie kodu testami jednostkowymi i integracyjnymi osiąga zdefiniowany próg (np. 80%).
- Wyniki testów zostały udokumentowane i zaakceptowane przez zespół.

---

## 9. Role i odpowiedzialności

| Rola | Odpowiedzialność |
|--------------|-------------------|
| **Deweloperzy** | - Pisanie i utrzymanie testów jednostkowych i integracyjnych. <br> - Naprawa błędów zgłoszonych przez QA. <br> - Uczestnictwo w code review pod kątem jakości i testowalności kodu. |
| **Inżynier QA** | - Projektowanie, tworzenie i utrzymanie planów testów oraz scenariuszy testowych (E2E, API, bezpieczeństwa). <br> - Automatyzacja testów. <br> - Raportowanie i weryfikacja błędów. <br> - Koordynacja testów akceptacyjnych (UAT). |
| **Product Owner** | - Definiowanie kryteriów akceptacji dla funkcjonalności. <br> - Priorytetyzacja błędów. <br> - Udział w testach akceptacyjnych (UAT). |

---

## 10. Procedury raportowania błędów

Wszystkie wykryte błędy będą raportowane jako **Issues** w repozytorium GitHub projektu. Każdy raport powinien zawierać:
- **Tytuł:** Zwięzły opis problemu.
- **Opis:**
    - Kroki do odtworzenia błędu (Steps to Reproduce).
    - Obserwowany rezultat (Actual Result).
    - Oczekiwany rezultat (Expected Result).
- **Środowisko:** Wersja aplikacji, przeglądarka, system operacyjny.
- **Priorytet/Waga:** (np. Krytyczny, Wysoki, Średni, Niski).
- **Załączniki:** Zrzuty ekranu, nagrania wideo, logi konsoli.
- **Etykiety:** (np. `bug`, `frontend`, `backend`, `security`).