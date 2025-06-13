# Plan Testów dla Projektu 10x-cards

## 1. Wprowadzenie i cele testowania

### 1.1. Wprowadzenie

Niniejszy dokument opisuje plan testów dla aplikacji `10x-cards`, której celem jest umożliwienie użytkownikom efektywnego tworzenia i zarządzania fiszkami edukacyjnymi przy użyciu sztucznej inteligencji. Projekt oparty jest na nowoczesnym stosie technologicznym, obejmującym Astro, React, TypeScript, Tailwind CSS oraz Supabase jako backend.

### 1.2. Cele testowania

Głównym celem procesu testowania jest zapewnienie wysokiej jakości, niezawodności, bezpieczeństwa i wydajności aplikacji przed jej wdrożeniem produkcyjnym.

Szczegółowe cele:
- Weryfikacja zgodności zaimplementowanych funkcjonalności z wymaganiami opisanymi w dokumentacji (`docs/prd.md`, `docs/api-plan.md`).
- Zapewnienie, że kluczowa funkcjonalność generowania fiszek przez AI działa stabilnie i poprawnie.
- Identyfikacja i eliminacja błędów w logice biznesowej, interfejsie użytkownika oraz w integracji z usługami zewnętrznymi.
- Upewnienie się, że aplikacja jest bezpieczna, a dane użytkowników są chronione.
- Ocena wydajności aplikacji pod obciążeniem, zwłaszcza w kontekście czasochłonnych operacji AI.
- Zapewnienie spójności wizualnej i poprawnego działania interfejsu na różnych przeglądarkach.

## 2. Zakres testów

### 2.1. Funkcjonalności w zakresie testów

- **API Backendu**: Wszystkie punkty końcowe zdefiniowane w `src/pages/api/`, ze szczególnym uwzględnieniem `POST /api/generations`.
- **Logika biznesowa**: Serwisy w `src/lib/`, przede wszystkim `GenerationService`.
- **Baza danych**: Poprawność schematu, migracje, integralność danych w Supabase.
- **Interfejs użytkownika (UI)**:
    - Komponenty statyczne (Astro).
    - Komponenty interaktywne (React, Shadcn/ui).
    - Przepływy użytkownika (np. proces generowania fiszek od wklejenia tekstu do otrzymania propozycji).
- **Uwierzytelnianie i autoryzacja**: Weryfikacja mechanizmów logowania i rejestracji oraz ochrony dostępu do danych (gdy zostaną w pełni zaimplementowane).

### 2.2. Funkcjonalności poza zakresem testów

- Testowanie wewnętrznej implementacji i infrastruktury usług zewnętrznych (Supabase, OpenRouter.ai). Nasze testy skupią się na integracji z tymi usługami.
- Testowanie bibliotek i frameworków firm trzecich (np. React, Astro), z wyjątkiem ich konfiguracji i wykorzystania w projekcie.
- Szczegółowe testy wydajnościowe samego modelu językowego AI.

## 3. Typy testów do przeprowadzenia

| Typ testu | Obszar | Opis |
| --- | --- | --- |
| **Testy jednostkowe (Unit Tests)** | - Serwisy (`GenerationService`) <br> - Komponenty React <br> - Funkcje pomocnicze | Weryfikacja pojedynczych modułów i funkcji w izolacji od zależności (z użyciem mocków). |
| **Testy integracyjne (Integration Tests)** | - API ↔ Serwis ↔ Baza Danych <br> - Komponent UI ↔ API <br> - Middleware | Sprawdzenie, czy poszczególne komponenty systemu poprawnie współpracują ze sobą. Kluczowe dla weryfikacji przepływu danych. |
| **Testy End-to-End (E2E)** | - Kluczowe ścieżki użytkownika (np. User Story z `prd.md`) | Symulacja pełnych scenariuszy z perspektywy użytkownika w przeglądarce, weryfikująca cały stos technologiczny. |
| **Testy bezpieczeństwa (Security Tests)** | - API (walidacja wejścia) <br> - Autoryzacja (RLS w Supabase) | Weryfikacja odporności na podstawowe ataki, ochrona danych użytkowników i poprawność reguł dostępu. |
| **Testy wydajnościowe (Performance Tests)** | - Endpoint `POST /api/generations` | Ocena czasu odpowiedzi i zachowania systemu pod obciążeniem, identyfikacja wąskich gardeł. |
| **Testy wizualnej regresji (Visual Regression Tests)** | - Komponenty UI <br> - Całe widoki | Automatyczne porównywanie zrzutów ekranu interfejsu w celu wykrycia niezamierzonych zmian wizualnych. |

## 4. Scenariusze testowe dla kluczowych funkcjonalności

### 4.1. Generowanie fiszek (US-003)

| ID | Scenariusz | Oczekiwany rezultat | Priorytet |
| --- | --- | --- | --- |
| TC-01 | Pomyślne wygenerowanie fiszek przy poprawnym tekście | Status 201, odpowiedź zawiera `generation_id`, `flashcards_proposals`, `generated_count`. W bazie danych pojawia się nowy rekord w tabeli `generations`. | **Krytyczny** |
| TC-02 | Próba generowania z tekstem za krótkim (<1000 znaków) | Status 400, odpowiedź zawiera komunikat o błędzie walidacji. | **Wysoki** |
| TC-03 | Próba generowania z tekstem za długim (>10000 znaków) | Status 400, odpowiedź zawiera komunikat o błędzie walidacji. | **Wysoki** |
| TC-04 | Błąd komunikacji z serwisem AI (np. timeout) | Status 500, w bazie danych pojawia się wpis w `generation_error_logs`. | **Wysoki** |
| TC-05 | Serwis AI zwraca niepoprawny format danych | Status 500, w bazie danych pojawia się wpis w `generation_error_logs` z odpowiednim komunikatem. | **Wysoki** |

### 4.2. Bezpieczeństwo i autoryzacja (przyszłościowo)

| ID | Scenariusz | Oczekiwany rezultat | Priorytet |
| --- | --- | --- | --- |
| TC-06 | Niezalogowany użytkownik próbuje wywołać `POST /api/generations` | Status 401 Unauthorized. | **Krytyczny** |
| TC-07 | Użytkownik A próbuje uzyskać dostęp do fiszek/generacji użytkownika B | Status 403 Forbidden lub 404 Not Found. | **Krytyczny** |

## 5. Środowisko testowe

| Środowisko | Opis | Cel |
| --- | --- | --- |
| **Lokalne (Development)** | Komputer dewelopera z `npm run dev`. Usługi zewnętrzne (AI, DB) mockowane lub podłączone do lokalnej instancji Supabase. | Testy jednostkowe, szybkie testy integracyjne, rozwój. |
| **Staging/Testowe** | Dedykowany serwer, możliwie zbliżony do produkcji. Połączony z testową instancją Supabase i OpenRouter (z kluczem API o niskim limicie). | Pełne testy integracyjne, E2E, UAT (User Acceptance Testing), testy wydajnościowe. |
| **Produkcyjne (Production)** | Środowisko docelowe dostępne dla użytkowników. | Smoke testy po wdrożeniu. |

Wersja Node.js powinna być zgodna z plikiem `.nvmrc` (22.14.0).

## 6. Narzędzia do testowania

- **Framework do testów jednostkowych i integracyjnych**: Vitest
- **Framework do testów E2E**: Playwright
- **Testy API**: Postman / Insomnia (manualne), wbudowany klient w Vitest/Playwright (automatyczne)
- **Testy wizualnej regresji**: Chromatic lub Percy
- **CI/CD**: GitHub Actions (uruchamianie testów automatycznych przy każdym PR)
- **Zarządzanie błędami**: GitHub Issues

## 7. Harmonogram testów

- **Testy jednostkowe i integracyjne**: Będą tworzone równolegle z nowymi funkcjonalnościami i uruchamiane automatycznie w pipeline CI/CD dla każdego Pull Requesta.
- **Testy E2E i wizualnej regresji**: Będą uruchamiane automatycznie w pipeline CI/CD po zmergowaniu kodu do głównego brancha (`master`/`main`).
- **Testy manualne i UAT**: Przed każdym wydaniem produkcyjnym, zgodnie z harmonogramem sprintu.
- **Testy bezpieczeństwa i wydajnościowe**: Przed pierwszym wdrożeniem produkcyjnym oraz cyklicznie co 3 miesiące lub po wprowadzeniu znaczących zmian w architekturze.

## 8. Kryteria akceptacji testów

### 8.1. Kryteria wejścia (rozpoczęcia testów)
- Kod został pomyślnie zintegrowany i wdrożony na środowisku testowym.
- Dokumentacja techniczna dla testowanych funkcjonalności jest dostępna.
- Wszystkie testy jednostkowe przechodzą pomyślnie.

### 8.2. Kryteria wyjścia (zakończenia testów)
- 100% krytycznych i wysokich scenariuszy testowych zakończyło się sukcesem.
- Pokrycie kodu testami jednostkowymi wynosi co najmniej 80%.
- Nie istnieją żadne niezaadresowane błędy o priorytecie krytycznym lub wysokim.
- Wyniki testów wydajnościowych mieszczą się w założonych limitach (np. czas odpowiedzi API poniżej zdefiniowanego progu).
- Dokumentacja z wynikami testów została przygotowana i zaakceptowana.

## 9. Role i odpowiedzialności

| Rola | Odpowiedzialność |
| --- | --- |
| **Deweloper** | - Tworzenie testów jednostkowych i integracyjnych dla swojego kodu. <br> - Naprawa błędów zgłoszonych przez zespół QA. |
| **Inżynier QA** | - Projektowanie i utrzymanie planu testów. <br> - Tworzenie i automatyzacja testów E2E, bezpieczeństwa i wydajnościowych. <br> - Przeprowadzanie testów manualnych i eksploracyjnych. <br> - Raportowanie i zarządzanie cyklem życia błędów. |
| **DevOps Engineer** | - Konfiguracja i utrzymanie środowisk testowych. <br> - Integracja testów automatycznych z pipeline'em CI/CD. |
| **Product Owner** | - Udział w testach UAT. <br> - Akceptacja funkcjonalności i podejmowanie decyzji o wdrożeniu. |

## 10. Procedury raportowania błędów

Wszystkie zidentyfikowane błędy będą raportowane w systemie **GitHub Issues** przy użyciu dedykowanego szablonu.

### Szablon zgłoszenia błędu:

- **Tytuł**: Krótki, zwięzły opis problemu.
- **Opis**: Szczegółowy opis błędu.
- **Kroki do odtworzenia**: Ponumerowana lista kroków potrzebnych do wywołania błędu.
- **Oczekiwany rezultat**: Co powinno się wydarzyć.
- **Aktualny rezultat**: Co faktycznie się wydarzyło.
- **Środowisko**: (np. Lokalnie, Staging, Produkcja; przeglądarka, wersja systemu).
- **Zrzuty ekranu / Logi**: Wszelkie materiały pomocnicze.
- **Priorytet**: (Krytyczny, Wysoki, Średni, Niski).
- **Etykiety**: (np. `bug`, `ui`, `backend`, `security`).