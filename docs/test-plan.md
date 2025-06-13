Doskonale. Jako doświadczony inżynier QA, przeanalizowałem dostarczone materiały i na ich podstawie przygotowałem kompleksowy plan testów.

***

# Kompleksowy Plan Testów dla Projektu "10x-cards"

## 1. Wprowadzenie i cele testowania

### 1.1. Wprowadzenie

Niniejszy dokument określa strategię, zakres, podejście oraz zasoby przeznaczone na proces testowania aplikacji **10x-cards**. Aplikacja ta ma na celu usprawnienie procesu nauki poprzez automatyczne generowanie fiszek edukacyjnych z tekstu dostarczonego przez użytkownika, z wykorzystaniem modeli językowych (LLM) za pośrednictwem usługi OpenRouter.ai. Projekt oparty jest o nowoczesny stos technologiczny, w skład którego wchodzą Astro, React, TypeScript, Tailwind CSS oraz Supabase jako backend.

### 1.2. Cele testowania

Głównym celem procesu testowania jest zapewnienie wysokiej jakości, stabilności, bezpieczeństwa i wydajności aplikacji przed jej wdrożeniem produkcyjnym.

Szczegółowe cele to:
*   **Weryfikacja zgodności z wymaganiami:** Potwierdzenie, że wszystkie funkcjonalności opisane w dokumencie wymagań produktu (`docs/prd.md`) oraz historyjkach użytkownika zostały zaimplementowane poprawnie.
*   **Identyfikacja i eliminacja defektów:** Wykrycie, zaraportowanie i śledzenie błędów na wszystkich poziomach aplikacji – od logiki biznesowej w backendzie, przez API, po interfejs użytkownika.
*   **Ocena bezpieczeństwa:** Weryfikacja kluczowych aspektów bezpieczeństwa, w szczególności izolacji danych użytkowników oraz poprawności mechanizmów autoryzacji.
*   **Weryfikacja wydajności:** Ocena czasu odpowiedzi kluczowych operacji, zwłaszcza tych zależnych od zewnętrznych serwisów (AI).
*   **Zapewnienie jakości kodu:** Utrzymanie wysokich standardów jakości kodu poprzez integrację testów ze zautomatyzowanym procesem CI/CD.
*   **Ocena użyteczności i dostępności (UI/UX & a11y):** Zapewnienie, że interfejs jest intuicyjny, responsywny i zgodny z podstawowymi standardami dostępności.

## 2. Zakres testów

### 2.1. Funkcjonalności w zakresie testów

Testami objęte zostaną wszystkie kluczowe moduły i funkcjonalności aplikacji, w tym:
*   **System uwierzytelniania:** Rejestracja, logowanie, zarządzanie sesją użytkownika.
*   **Generowanie fiszek przez AI:** Proces przesyłania tekstu, komunikacja z API OpenRouter, obsługa odpowiedzi i prezentacja propozycji fiszek.
*   **Zarządzanie fiszkami (CRUD):** Ręczne tworzenie, odczyt, edycja i usuwanie fiszek.
*   **Zarządzanie propozycjami od AI:** Akceptacja, edycja i odrzucanie wygenerowanych fiszek.
*   **Backend API:** Wszystkie endpointy zdefiniowane w `docs/api-plan.md`, w tym walidacja danych wejściowych, logika biznesowa i obsługa błędów.
*   **Baza danych:** Spójność danych, integralność referencyjna, działanie triggerów i polityk RLS.
*   **Interfejs użytkownika:** Wygląd, responsywność, interaktywność komponentów React oraz statyczne strony Astro.
*   **Proces deweloperski:** Działanie skryptów `npm`, hooków `pre-commit` i statycznej analizy kodu.

### 2.2. Funkcjonalności poza zakresem testów

*   **Wewnętrzna logika modeli LLM:** Testujemy integrację z API OpenRouter i poprawność obsługi odpowiedzi, a nie jakość merytoryczną samych modeli AI.
*   **Infrastruktura Supabase i DigitalOcean:** Zakładamy stabilność i poprawność działania usług dostawców zewnętrznych. Testujemy konfigurację i wykorzystanie tych usług.
*   **Funkcjonalności wymienione jako "poza zakresem MVP"** w `docs/prd.md` (np. gamifikacja, aplikacje mobilne).

## 3. Typy testów do przeprowadzenia

### 3.1. Testy Statyczne i Lintery
*   **Obszar:** Cała baza kodu (`.ts`, `.tsx`, `.astro`).
*   **Cel:** Weryfikacja zgodności ze standardami kodowania, wykrywanie potencjalnych błędów i "code smells" przed wykonaniem kodu.
*   **Wykonanie:** Automatycznie, za pomocą skryptu `npm run lint` uruchamianego w ramach `pre-commit` hooka (Husky) oraz w pipeline CI/CD.

### 3.2. Testy Jednostkowe (Unit Tests)
*   **Obszar:** Izolowane funkcje i serwisy w `src/lib/`, małe komponenty React.
*   **Cel:** Weryfikacja poprawności działania najmniejszych, logicznych fragmentów kodu w izolacji.
*   **Przykłady:**
    *   Funkcje pomocnicze (np. `calculateHash` w `generation.service.ts`).
    *   Logika walidacji w schematach `zod`.
    *   Renderowanie komponentów UI z różnymi propsami.

### 3.3. Testy Integracyjne
*   **Obszar:** Współpraca między modułami systemu.
*   **Cel:** Sprawdzenie, czy poszczególne komponenty poprawnie ze sobą współpracują.
*   **Przykłady:**
    *   **Backend:** Weryfikacja przepływu `API Endpoint` (`generations.ts`) -> `GenerationService` -> `SupabaseClient` (z mockowaną bazą danych).
    *   **Frontend:** Sprawdzenie, czy interaktywny komponent React poprawnie komunikuje się ze stroną Astro, na której jest osadzony.
    *   **Full-stack:** Testy endpointu API z mockowanym serwisem AI, ale z realnym połączeniem do testowej bazy danych Supabase.

### 3.4. Testy End-to-End (E2E)
*   **Obszar:** Pełne ścieżki użytkownika w aplikacji.
*   **Cel:** Symulacja rzeczywistych interakcji użytkownika z aplikacją w przeglądarce, weryfikująca cały stos technologiczny od UI po bazę danych.
*   **Przykłady:**
    *   Pełen proces rejestracji i logowania.
    *   Scenariusz "szczęśliwej ścieżki": zalogowanie, wklejenie tekstu, wygenerowanie fiszek, edycja jednej z nich i zapisanie w bazie danych.
    *   Scenariusz usuwania fiszki z potwierdzeniem.

### 3.5. Testy API
*   **Obszar:** Wszystkie endpointy REST API zdefiniowane w `src/pages/api/` i udokumentowane w `docs/api-plan.md`.
*   **Cel:** Weryfikacja kontraktu API, w tym metod HTTP, struktur żądań i odpowiedzi, kodów statusu, walidacji oraz obsługi błędów.
*   **Przykłady:**
    *   Wysłanie żądania `POST /generations` z tekstem o nieprawidłowej długości i oczekiwanie statusu `400`.
    *   Pobranie listy fiszek (`GET /flashcards`) i weryfikacja struktury JSON oraz paginacji.
    *   Próba usunięcia nieistniejącej fiszki (`DELETE /flashcards/{id}`) i oczekiwanie statusu `404`.

### 3.6. Testy Bezpieczeństwa
*   **Obszar:** Uwierzytelnianie, autoryzacja, izolacja danych.
*   **Cel:** Identyfikacja i eliminacja luk bezpieczeństwa.
*   **Priorytet:** **NAJWYŻSZY**. Analiza migracji (`20240320143003_disable_rls_policies.sql`) wskazuje, że polityki Row-Level Security są wyłączone. Jest to krytyczne ryzyko.
*   **Przykłady:**
    *   **Weryfikacja izolacji danych:** Użytkownik A tworzy fiszki. Użytkownik B po zalogowaniu nie może uzyskać dostępu do danych użytkownika A poprzez bezpośrednie wywołania API.
    *   **Testowanie endpointów chronionych:** Próba dostępu do chronionych zasobów bez ważnego tokenu JWT (oczekiwany status `401 Unauthorized`).
    *   Weryfikacja, czy polityki RLS (po ich ponownym włączeniu) działają zgodnie z założeniami z `docs/db-plan.md`.

### 3.7. Testy Wydajności
*   **Obszar:** Kluczowe, potencjalnie wolne operacje.
*   **Cel:** Zmierzenie czasu odpowiedzi i obciążalności systemu.
*   **Przykłady:**
    *   Test obciążeniowy dla endpointu `POST /generations` w celu zmierzenia średniego czasu odpowiedzi przy jednoczesnych żądaniach od wielu użytkowników. Weryfikacja działania timeoutu (60s).

### 3.8. Testy Użyteczności i Dostępności (UI/UX & a11y)
*   **Obszar:** Interfejs użytkownika.
*   **Cel:** Zapewnienie intuicyjności, spójności wizualnej i zgodności ze standardami WCAG.
*   **Przykłady:**
    *   Weryfikacja responsywności layoutu na różnych rozdzielczościach (mobilne, tablet, desktop).
    *   Sprawdzenie kontrastu kolorów, etykiet dla pól formularzy (`aria-label`) i nawigacji za pomocą klawiatury.

## 4. Scenariusze testowe dla kluczowych funkcjonalności

| ID Scenariusza | Funkcjonalność (User Story)                               | Kroki do wykonania                                                                                                                                                                                                                                                                                         | Oczekiwany rezultat                                                                                                                                                                                        | Typ testu |
| :------------- | :---------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------- |
| **TC-001**     | US-003, US-004: Generowanie fiszek przez AI i ich akceptacja | 1. Użytkownik loguje się do aplikacji. <br> 2. Przechodzi do widoku generowania fiszek. <br> 3. Wkleja tekst o długości 1500 znaków. <br> 4. Klika przycisk "Generuj". <br> 5. Edytuje treść jednej z propozycji. <br> 6. Zaznacza 3 z 5 propozycji (w tym edytowaną). <br> 7. Klika "Zapisz wybrane".                  | 1. Po kliknięciu "Generuj" widoczny jest wskaźnik ładowania. <br> 2. Po chwili pojawia się lista 5 propozycji fiszek. <br> 3. Edycja jest możliwa. <br> 4. Po zapisaniu użytkownik widzi 3 nowe fiszki na liście "Moje fiszki". Fiszka edytowana ma status `ai-edited`. | E2E       |
| **TC-002**     | US-003: Walidacja danych wejściowych dla generacji AI       | 1. Użytkownik loguje się. <br> 2. Wkleja tekst o długości 500 znaków. <br> 3. Klika "Generuj". <br> 4. Wkleja tekst o długości 15000 znaków. <br> 5. Klika "Generuj".                                                                                                                                             | 1. W obu przypadkach użytkownik otrzymuje komunikat błędu walidacji informujący o nieprawidłowej długości tekstu (min. 1000, max. 10000 znaków). <br> 2. Żądanie do API nie zostaje wysłane.               | E2E, API  |
| **TC-003**     | US-009: Test izolacji danych użytkownika (Bezpieczeństwo)    | 1. Użytkownik A loguje się i tworzy fiszkę o ID=101. <br> 2. Użytkownik B loguje się na swoje konto. <br> 3. Użytkownik B próbuje pobrać dane fiszki ID=101 przez bezpośrednie wywołanie API: `GET /flashcards/101`. <br> 4. Użytkownik B próbuje usunąć fiszkę ID=101: `DELETE /flashcards/101`. | 1. W obu przypadkach (krok 3 i 4) API zwraca błąd `404 Not Found` lub `403 Forbidden`, uniemożliwiając dostęp do danych innego użytkownika. <br> 2. Fiszka użytkownika A pozostaje nienaruszona. | Bezp.    |
| **TC-004**     | API: Błędna obsługa integracji z AI                         | 1. Mock serwisu OpenRouter zostaje skonfigurowany, aby zwracał błąd 500 lub niepoprawny format JSON. <br> 2. Użytkownik wysyła poprawne żądanie `POST /generations`.                                                                                                                                            | 1. API zwraca status `500 Internal Server Error` z generycznym komunikatem. <br> 2. W tabeli `generation_error_logs` w bazie danych pojawia się nowy wpis zawierający szczegóły błędu.                 | Integr.   |
| **TC-005**     | US-006: Usuwanie fiszki                                     | 1. Użytkownik loguje się. <br> 2. Przechodzi do listy "Moje fiszki". <br> 3. Klika przycisk "Usuń" przy wybranej fiszce. <br> 4. Pojawia się modal z prośbą o potwierdzenie. <br> 5. Użytkownik klika "Potwierdź".                                                                                            | 1. Fiszka znika z listy w interfejsie użytkownika. <br> 2. Rekord odpowiadający fiszce zostaje trwale usunięty z bazy danych.                                                                          | E2E       |

## 5. Środowisko testowe

*   **Środowisko deweloperskie (lokalne):** Używane przez deweloperów do tworzenia i uruchamiania testów jednostkowych i integracyjnych. Konfiguracja zgodna z `README.md` i `.nvmrc` (Node.js v22.14.0). Uruchamiane za pomocą `npm run dev`.
*   **Środowisko testowe (Staging):** Osobna instancja aplikacji wdrożona na DigitalOcean, połączona z dedykowaną, odizolowaną instancją bazy danych Supabase. Środowisko to powinno jak najwierniej odzwierciedlać środowisko produkcyjne. Tutaj będą przeprowadzane testy E2E, API i bezpieczeństwa.
*   **Środowisko produkcyjne (Production):** Środowisko dostępne dla użytkowników końcowych. Wykonywane na nim będą jedynie testy typu "smoke test" po każdym wdrożeniu.

## 6. Narzędzia do testowania

| Kategoria                     | Narzędzie                                  | Uzasadnienie                                                                                                 |
| :---------------------------- | :----------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| **Framework testowy**         | **Vitest**                                 | Nowoczesny i szybki framework, kompatybilny z Vite, co idealnie pasuje do ekosystemu Astro.                    |
| **Testy komponentów**         | **React Testing Library**                  | Promuje pisanie testów z perspektywy użytkownika, co zwiększa ich wartość i odporność na refaktoryzację.       |
| **Testy E2E**                 | **Playwright** lub **Cypress**             | Oba narzędzia oferują zaawansowane możliwości testowania w przeglądarce, nagrywanie testów i debugowanie. |
| **Testy API**                 | **Postman / Insomnia** / **Skrypty Vitest** | Do manualnego i automatycznego testowania API. Skrypty w Vitest pozwolą na integrację testów API z CI/CD.    |
| **Zarządzanie testami i błędami** | **GitHub Issues** lub **Jira**               | Do tworzenia scenariuszy testowych, raportowania i śledzenia cyklu życia defektów.                           |
| **CI/CD**                     | **GitHub Actions**                         | Natywna integracja z repozytorium GitHub do automatycznego uruchamiania testów po każdym push/merge.         |
| **Statyczna analiza kodu**    | **ESLint**, **Prettier**                   | Już skonfigurowane w projekcie, zapewniają spójność i jakość kodu.                                           |

## 7. Harmonogram testów

Proces testowania będzie prowadzony w sposób ciągły, równolegle z procesem deweloperskim.
*   **Testy jednostkowe i integracyjne:** Tworzone przez deweloperów w trakcie implementacji nowych funkcjonalności.
*   **Testy API, E2E i bezpieczeństwa:** Przygotowywane przez zespół QA równolegle z developmentem. Uruchamiane na środowisku Staging po każdej większej aktualizacji lub przed planowanym wydaniem.
*   **Testy regresji:** Pełny zestaw zautomatyzowanych testów (Unit, Integration, E2E, API) będzie uruchamiany automatycznie w ramach pipeline'u CI/CD przed każdym mergem do głównego brancha oraz przed wdrożeniem na produkcję.
*   **Testy "smoke":** Krótki zestaw kluczowych testów E2E uruchamiany manualnie lub automatycznie na środowisku produkcyjnym bezpośrednio po wdrożeniu.

## 8. Kryteria akceptacji testów

### 8.1. Kryteria wejścia (rozpoczęcia testów)
*   Kod źródłowy został pomyślnie zbudowany i wdrożony na środowisku testowym.
*   Wszystkie testy jednostkowe i podstawowe testy integracyjne przechodzą pomyślnie.
*   Dokumentacja dla testowanych funkcjonalności (np. `api-plan.md`) jest aktualna.

### 8.2. Kryteria wyjścia (zakończenia testów)
*   **100%** krytycznych scenariuszy testowych (E2E, API, Bezpieczeństwo) zakończyło się sukcesem.
*   **95%** wszystkich pozostałych scenariuszy testowych zakończyło się sukcesem.
*   Brak otwartych błędów o priorytecie krytycznym (Blocker) lub wysokim (Critical).
*   Wszystkie zidentyfikowane luki bezpieczeństwa zostały naprawione.
*   Pokrycie kodu testami jednostkowymi i integracyjnymi osiągnęło uzgodniony próg (np. 70%).

## 9. Role i odpowiedzialności w procesie testowania

*   **Inżynier QA:**
    *   Tworzenie i utrzymanie niniejszego planu testów.
    *   Projektowanie, implementacja i utrzymanie zautomatyzowanych testów (API, E2E, bezpieczeństwa, wydajności).
    *   Wykonywanie testów manualnych (eksploracyjnych, użyteczności).
    *   Raportowanie i weryfikacja błędów.
    *   Zarządzanie środowiskiem testowym.
*   **Deweloperzy:**
    *   Tworzenie i utrzymanie testów jednostkowych i integracyjnych dla swojego kodu.
    *   Uruchamianie testów lokalnie przed wypchnięciem zmian do repozytorium.
    *   Naprawianie błędów zgłoszonych przez zespół QA.
    *   Utrzymanie jakości kodu zgodnie z zasadami linterów.
*   **Product Owner / Project Manager:**
    *   Definiowanie kryteriów akceptacji dla historyjek użytkownika.
    *   Uczestnictwo w testach akceptacyjnych użytkownika (UAT).
    *   Priorytetyzacja naprawy błędów.

## 10. Procedury raportowania błędów

Wszystkie wykryte błędy będą raportowane w systemie do śledzenia błędów (np. GitHub Issues) i powinny zawierać następujące informacje:

*   **Tytuł:** Zwięzły i jednoznaczny opis problemu.
*   **Środowisko:** Na którym środowisku wystąpił błąd (np. Local, Staging, Production).
*   **Kroki do odtworzenia:** Szczegółowa, ponumerowana lista kroków prowadzących do wystąpienia błędu.
*   **Wynik oczekiwany:** Opis, jak aplikacja powinna się zachować.
*   **Wynik aktualny:** Opis, jak aplikacja faktycznie się zachowała.
*   **Priorytet/Waga:** Określenie wpływu błędu na działanie systemu (np. Blocker, Critical, Major, Minor).
*   **Załączniki:** Zrzuty ekranu, nagrania wideo, logi z konsoli, które mogą pomóc w diagnozie problemu.