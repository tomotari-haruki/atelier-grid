document.documentElement.classList.add('js');

const searchInput = document.querySelector('#search');
const categorySelect = document.querySelector('#category');
const cards = Array.from(document.querySelectorAll('.post-card'));
const tagButtons = Array.from(document.querySelectorAll('[data-tag]'));
const resultCount = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');
const progressBar = document.querySelector('#reading-progress');
const inquiryForm = document.querySelector('#inquiry-form');
const formStatus = document.querySelector('#form-status');
const storedLanguage = localStorage.getItem('atelier-grid-language');
let activeTag = 'all';
let currentLanguage = storedLanguage === 'en' ? 'en' : 'ja';
let translationNodes = [];

const translations = {
  '本文へ移動': 'Skip to content',
  '作品の美しさ、制作の思考、依頼までの導線をひとつの体験に束ねる、デザイナー向けポートフォリオWebサイト。ランディングページとCMS記事を同じ世界観で設計しています。': 'A portfolio website for designers that brings visual craft, design thinking, and inquiry paths into one cohesive experience. The landing page and CMS articles share the same visual world.',
  '記事を読む': 'Read Journal',
  '構成を見る': 'View Structure',
  '情報設計': 'Information Design',
  '3分で強みが伝わる導線': 'A flow that communicates strengths in three minutes',
  'CMS設計': 'CMS Design',
  '記事運用まで見える構造': 'A structure that makes editorial operation visible',
  'ブランド体験': 'Brand Experience',
  '色・余白・言葉の統一': 'Unified color, spacing, and language',
  'レスポンシブ': 'Responsive',
  '採用担当者のスマホ閲覧にも対応': 'Optimized for recruiter viewing on mobile',
  '見た目の強さと、依頼しやすい構造を同時に設計する。': 'Designing visual strength and an inquiry-ready structure at the same time.',
  'Tomotari Harukiは、ランディングページ、CMS記事設計、UI改善、ブランド整理を横断して、作品の魅力と依頼導線をひとつの体験にまとめるデザイナーです。': 'Tomotari Haruki is a designer who connects landing pages, CMS article design, UI improvement, and brand organization into one experience that presents the work and guides inquiries.',
  'このデモでは、ビジュアル、記事運用、ケーススタディ、問い合わせ前の安心材料までを同じ温度で整え、海外の閲覧者にも伝わるよう日本語/英語の切り替えを用意しています。': 'This demo aligns visuals, editorial operation, case studies, and pre-inquiry reassurance with one tone, with Japanese/English switching for international viewers.',
  '見栄えと導線の両立': 'Visual polish and clear paths',
  'LP、CMS、記事、問い合わせUX': 'Landing pages, CMS, articles, and inquiry UX',
  '暗色UI、編集感、強いタイポグラフィ': 'Dark UI, editorial mood, and strong typography',
  '初回相談から構成、ビジュアル、CMS運用設計まで対応。': 'From first consultation to structure, visuals, and CMS operation design.',
  '作品を並べるだけで終わらせない。思考、成果、更新性まで見せるポートフォリオ。': 'A portfolio that goes beyond displaying work, showing thinking, outcomes, and long-term maintainability.',
  'LPは「誰のために、何を、どんな判断で作ったのか」を最短距離で伝える構成に再設計。ケーススタディ、制作プロセス、CMS記事、問い合わせ導線を分けずに、ひとつの評価体験として組み上げています。': 'The landing page is structured to quickly show who the work is for, what was made, and which design decisions shaped it. Case studies, process, CMS articles, and inquiry paths are connected as one evaluation experience.',
  '肩書きより先に世界観と完成度が伝わるビジュアル設計。': 'Visual design that communicates worldbuilding and polish before any title does.',
  '課題、仮説、アウトプット、成果指標を同じ粒度で提示。': 'Presents problems, hypotheses, outputs, and outcomes at the same level of clarity.',
  '記事を制作思想の証拠として蓄積できる投稿ページ群。': 'A group of article pages that archive design thinking as proof of expertise.',
  'LP、CMS、スマホ表示まで、同じアートディレクションでつなぐ。': 'Landing page, CMS, and mobile views connected through one art direction.',
  '作品画像だけではなく、記事運用、デザインシステム、問い合わせ導線まで一枚の世界観で見せ、デザイナーとしての総合力が伝わる構成にしています。': 'Beyond project visuals, the site presents editorial operation, design systems, and inquiry flows in one visual language, communicating the full range of a designer’s capability.',
  'ポートフォリオに必要な“見栄え”と“判断材料”を同時に置く。': 'Visual impact and decision-making evidence, placed together.',
  '生成ビジュアル、タイポグラフィ、余白、色彩の強弱で、最初の数秒に記憶される画面を作ります。': 'Generated visuals, typography, spacing, and color contrast create screens that stay memorable within seconds.',
  '機能説明ではなく、ユーザーの流れに沿って「なぜこの設計なのか」が伝わる構成に整えます。': 'Instead of listing features, the structure explains why the design choices matter through the user journey.',
  '記事一覧、カテゴリ、タグ、関連記事、読了導線を用意し、運用して育つサイトにします。': 'Article lists, categories, tags, related links, and reading flows make the site grow through operation.',
  '問い合わせ前に必要な安心材料を配置し、依頼の温度を下げずにCTAまで運びます。': 'Trust signals are placed before contact so motivation stays high all the way to the CTA.',
  'デザイナーとして評価される要素を、見た目の中に埋め込む。': 'Embedding the proof designers are judged by into the visual experience.',
  '記事カバー、ケーススタディ、CMS画面まで同じアートディレクションで統一。画像がただの飾りではなく、制作思想の証拠として働きます。': 'Article covers, case studies, and CMS screens share one art direction, making imagery work as proof of design thinking rather than decoration.',
  'デザイン判断を記事として蓄積し、面談・営業・採用でそのまま説明材料にできる構造を持たせています。': 'Design decisions are archived as articles, ready to support interviews, sales conversations, and recruiting.',
  '大きな見出し、横スクロールナビ、カード密度、画像比率をPC/スマホで調整し、派手さと読みやすさを両立します。': 'Large headings, horizontal navigation, card density, and image ratios are tuned across desktop and mobile to balance impact and readability.',
  '色、文字、カード、CTAまで、ポートフォリオの人格を一貫させる。': 'Color, type, cards, and CTAs all keep the portfolio’s personality consistent.',
  '作品を見せるサイトほど、UIそのものが制作者の審美眼として見られます。ここでは、カバー画像の暗い質感に合わせて、アイボリーの文字、シアンの情報線、コーラルの行動色を絞って使っています。': 'On a portfolio site, the UI itself becomes evidence of taste. Here, ivory text, cyan information lines, and coral action color are used sparingly against the dark cover imagery.',
  '見出しは強く、本文は静かに。作品画像の情報量を受け止めるため、UIの装飾は線・余白・光量で制御します。': 'Headings are bold, body text is calm. Lines, spacing, and light control the UI so it can hold rich project imagery.',
  '採用担当者やクライアントが見たい要素を、ケース別に整理。': 'Organizing what recruiters and clients need to see by case type.',
  'スタイルガイドを“納品物”ではなく、運用資産として見せる。': 'Showing style guides as operational assets, not just deliverables.',
  '色、文字、コンポーネント、写真方針を一画面で把握できるようにまとめ、デザイン判断の再現性を示します。': 'Color, typography, components, and photo direction are shown together to demonstrate repeatable design decisions.',
  'ファーストビューからCTAまで、視線の流れを設計する。': 'Designing the eye flow from first view to CTA.',
  '読者が迷わずスクロールできるよう、見出し、証拠、比較、次の行動をリズムよく接続します。': 'Headings, proof, comparison, and next actions are connected rhythmically so readers keep scrolling without confusion.',
  '記事を増やすほど、制作者の信頼が積み上がる構造に。': 'A structure where each new article builds more trust in the creator.',
  '単発のブログではなく、専門性・思考・改善履歴が残る編集アーカイブとして設計します。': 'Designed as an editorial archive of expertise, thinking, and improvements rather than a one-off blog.',
  '華やかさの裏側に、説明できる制作プロセスを置く。': 'Putting an explainable process behind the visual impact.',
  '現状の作品、文章、導線を棚卸しし、足りない判断材料を特定します。': 'Audit current work, copy, and flows to identify missing evaluation signals.',
  '誰に選ばれたいのかを明確にし、見せる順番と語る角度を決めます。': 'Clarify who should choose you, then decide what to show and how to frame it.',
  '色、写真、余白、カード、CTAを揃え、ページ全体の密度を設計します。': 'Align color, imagery, spacing, cards, and CTAs to control the density of the full page.',
  '記事カード、カテゴリ、タグ、関連記事を増やしやすい形に分解します。': 'Break article cards, categories, tags, and related links into scalable parts.',
  'レスポンシブ、余白、hover、読みやすさを最後まで磨き込みます。': 'Polish responsiveness, spacing, hover states, and readability until the end.',
  '記事が増えるほど、デザイナーとしての専門性が伝わる。': 'The more articles the site holds, the more design expertise it communicates.',
  '一覧ページは検索、カテゴリ、タグで絞り込み可能。投稿ページはリード、目次、本文、チェックリスト、関連記事を置ける構造にし、Headless CMSへ移行しやすい命名とデータ属性で整えています。': 'The list page supports search, categories, and tags. Post pages are structured for leads, contents, body copy, checklists, and related articles, with names and data attributes ready for a headless CMS.',
  '15本の投稿ページと専用アイキャッチ': '15 post pages with dedicated cover visuals',
  '検索、タグチップ、件数表示、読了バー': 'Search, tag chips, result count, and reading progress',
  'microCMS / Contentful / Strapiへ接続しやすい構成': 'Structured for easy connection to microCMS, Contentful, or Strapi',
  'CMS投稿ページ15本すべてに、専用アイキャッチと編集導線を持たせる。': 'All 15 CMS post pages include dedicated cover images and editorial paths.',
  '全カテゴリー': 'All categories',
  '15件の記事を表示中': '15 articles shown',
  '条件に合う記事がありません。検索語やカテゴリを変えてみてください。': 'No articles match these conditions. Try a different keyword or category.',
  'FigmaのDesign Tokenを使った運用テンプレート': 'A Practical Figma Design Token Template',
  'チーム制作で崩れがちな一貫性を、トークン管理で最小コストに保つ方法。': 'How token management keeps team design consistency intact with minimal overhead.',
  'ブランド体験を強化する色彩設計の実務フロー': 'A Practical Color Workflow for Stronger Brand Experience',
  '印象だけではなく、KPIに効くカラールールの定義と検証手順。': 'Defining and testing color rules that affect KPIs, not just impressions.',
  'Notionでつくるデザイン案件の進行管理ボード': 'A Notion Board for Managing Design Projects',
  'ヒアリングから納品までを見える化し、手戻りを減らすボード設計。': 'A board structure that visualizes work from discovery to delivery and reduces rework.',
  'アクセシビリティを壊さないレスポンシブ実装術': 'Responsive Implementation Without Breaking Accessibility',
  '見栄えと使いやすさの両立を実現する、実装前チェックリスト。': 'A pre-build checklist for balancing visual polish and usability.',
  'ポートフォリオを受注導線に変える提案ページ構成': 'Turning a Portfolio into a Proposal Flow',
  '「見せるだけ」から「依頼したくなる」へ変える構成テンプレート。': 'A structure that moves a portfolio from “just showing work” to “making people want to inquire.”',
  '採用担当者に3分で伝わるケーススタディ設計': 'Case Study Design Recruiters Can Understand in Three Minutes',
  '課題、仮説、成果を短時間で理解できるページ構成の作り方。': 'How to structure pages so problems, hypotheses, and outcomes are understood quickly.',
  'CMS記事をポートフォリオ資産に変える編集カレンダー': 'An Editorial Calendar That Turns CMS Posts into Portfolio Assets',
  '思考の蓄積が営業資料になる、記事テーマと更新ペースの設計。': 'Designing article themes and cadence so accumulated thinking becomes sales material.',
  'AI画像生成をWeb制作に組み込むアートディレクション': 'Art Direction for Using AI Images in Web Production',
  '生成画像を“飾り”で終わらせず、ブランド体験に接続する手順。': 'A process for connecting generated visuals to brand experience instead of using them as decoration.',
  'LPのファーストビューを強くする情報設計': 'Information Architecture for a Stronger Landing Page First View',
  '見た目の強さと、次に読む理由を同時に作るファーストビュー設計。': 'Designing a first view that feels strong and gives people a reason to keep reading.',
  'デザインシステムの監査チェックリスト': 'Design System Audit Checklist',
  '崩れたルールを責めずに直せる、現場向けの監査フレーム。': 'A practical audit framework for fixing drift without blaming the team.',
  '価格表を怖く見せないサービスページ設計': 'Service Page Design That Makes Pricing Feel Clear',
  '金額を出すほど信頼が増す、比較と安心材料の置き方。': 'How comparison and reassurance make transparent pricing build trust.',
  'フリーランスのための問い合わせフォームUX': 'Inquiry Form UX for Freelancers',
  '相談前の不安を減らし、質の高い依頼につなげる入力体験。': 'An input experience that reduces hesitation and leads to higher-quality inquiries.',
  '制作実績ページのBefore/After比較設計': 'Designing Before/After Comparisons for Case Study Pages',
  '改善価値と判断理由を短時間で伝える、比較UIと注釈設計。': 'Comparison UI and annotation design that quickly communicates improvement value and decision rationale.',
  'microCMSへ移行しやすい静的HTMLのデータ設計': 'Static HTML Data Design for Easier microCMS Migration',
  '静的デモからHeadless CMSへつなげる、フィールドと画像管理の考え方。': 'How to structure fields and media management so a static demo can move into a headless CMS.',
  'ポートフォリオのOGP画像を自動生成する設計': 'Designing Automated OGP Images for Portfolio Articles',
  'SNS共有時の第一印象を揃える、記事データ連動のOGP設計。': 'An article-data-driven OGP system that keeps social sharing previews consistent.',
  '制作実績ページのBefore/After比較設計 | Atelier Grid': 'Designing Before/After Comparisons for Case Study Pages | Atelier Grid',
  'microCMSへ移行しやすい静的HTMLのデータ設計 | Atelier Grid': 'Static HTML Data Design for Easier microCMS Migration | Atelier Grid',
  'ポートフォリオのOGP画像を自動生成する設計 | Atelier Grid': 'Designing Automated OGP Images for Portfolio Articles | Atelier Grid',
  '依頼前に、何を任せられるかが一目で分かるメニュー構成。': 'A service menu that makes it clear what can be entrusted before inquiry.',
  'ポートフォリオLP設計': 'Portfolio Landing Page Design',
  'ファーストビュー、実績導線、CTA、レスポンシブまで、見せたい強みが最短距離で伝わるページに整えます。': 'From first view to work flow, CTA, and responsiveness, the page is shaped so strengths are understood quickly.',
  '情報設計とワイヤー': 'Information architecture and wireframes',
  'ビジュアル方向性': 'Visual direction',
  'レスポンシブ実装方針': 'Responsive implementation direction',
  '記事CMSと編集導線': 'Article CMS and editorial flow',
  '記事一覧、タグ、関連記事、投稿テンプレートを設計し、思考の蓄積が営業資料として働く構造にします。': 'Article lists, tags, related posts, and post templates are designed so accumulated thinking works as sales material.',
  '投稿テンプレート': 'Post templates',
  'カテゴリ/タグ設計': 'Category and tag design',
  'Headless CMS移行準備': 'Headless CMS migration preparation',
  'UI品質監査と改善提案': 'UI quality audit and improvement plan',
  '見出し、余白、CTA、フォーム、スマホ表示を確認し、見栄えと使いやすさの両面から改善点を整理します。': 'Headings, spacing, CTAs, forms, and mobile views are reviewed to organize improvements for both polish and usability.',
  'レスポンシブ確認': 'Responsive review',
  'デザインシステム監査': 'Design system audit',
  '改善優先度リスト': 'Improvement priority list',
  '相談前の不安を減らし、次の一歩まで自然につなげる。': 'Reduce pre-inquiry hesitation and lead naturally to the next step.',
  '制作したいページ、見直したい導線、CMS化したい記事運用があれば、最初はざっくりした相談でも進められます。フォームは静的デモ用ですが、Netlify FormsやFormspreeへ接続できる構造にしています。': 'Whether it is a page to build, a flow to improve, or articles to move into a CMS, a rough first inquiry is enough. This form is for the static demo, but it is structured for Netlify Forms or Formspree.',
  'お名前': 'Name',
  'メールアドレス': 'Email address',
  '相談内容': 'Project type',
  '選択してください': 'Please select',
  'LP制作': 'Landing page',
  'CMS記事設計': 'CMS article design',
  'UI改善': 'UI improvement',
  'その他': 'Other',
  'メッセージ': 'Message',
  '相談内容を確認する': 'Review inquiry',
  '入力内容を確認しました。実運用ではNetlify FormsやFormspreeへ接続できます。': 'Inquiry details checked. In production, this can connect to Netlify Forms or Formspree.',
  'ポートフォリオとして見せるだけでなく、依頼につながる余白を残す。': 'Leave room for inquiries, not just presentation.',
  'このデモは、将来的にプロフィール、制作実績、問い合わせフォーム、CMS API、OGP自動生成まで拡張できます。今は静的HTMLのまま、完成イメージが伝わる密度まで引き上げています。': 'This demo can expand into a profile, project archive, inquiry form, CMS API, and automatic OGP image generation. For now, the static HTML is polished enough to communicate the finished direction.',
  'microCMS連携で記事を自動表示': 'Auto-display articles with microCMS integration',
  '作品詳細ページとBefore/After比較': 'Project detail pages with before/after comparisons',
  '問い合わせフォームと自動返信メール': 'Inquiry form with automated reply email',
  'OGP画像の自動生成テンプレート': 'Automatic OGP image template',
  'Journalへ戻る': 'Back to Journal',
  '問い合わせフォームは、ただ連絡先を集める場所ではありません。相談前の不安を減らし、必要な情報を自然に受け取るための体験です。': 'An inquiry form is not just a place to collect contact details. It is an experience that reduces hesitation and receives the right information naturally.',
  '良いフォームは、入力前より送信後の方が安心感を強くします。': 'A good form makes people feel more reassured after sending than before filling it in.',
  '最初に聞くのは、相手が答えやすいこと': 'Start with questions that are easy to answer',
  '予算や納期は重要ですが、いきなり詳しく聞くと止まる人もいます。相談したい内容、現在の状態、困っていることから始め、必要に応じて詳細へ進めます。': 'Budget and timeline matter, but asking for too much detail up front can stop people. Start with what they want to discuss, their current situation, and what they are struggling with, then move into details as needed.',
  '必須項目は少なく、補足欄を賢く使う': 'Keep required fields minimal and use optional fields wisely',
  'すべてを必須にすると、入力途中で離脱されます。最低限の連絡先と相談内容を必須にし、参考URLや希望納期は任意にする方が自然です。': 'If every field is required, people drop off midway. Make only contact details and inquiry content required, while reference URLs and preferred timelines stay optional.',
  '送信前に返信目安を表示する': 'Show expected response time before submission',
  '添付が必要な場合は容量や形式を明記する': 'State file size and format limits when attachments are needed',
  'エラー文は何を直せばよいかまで書く': 'Write error messages that explain exactly what to fix',
  '送信後に次の流れを伝える': 'Explain the next steps after submission',
  '送信後画面もデザインする': 'Design the post-submit screen too',
  '送信完了だけでは、相手は次に何が起きるか分かりません。返信目安、確認メール、初回相談の流れを出すことで、問い合わせ体験が最後まで整います。': 'A simple “sent” message does not tell people what happens next. Response timing, confirmation email, and the first consultation flow complete the inquiry experience.',
  'フォームUXは、サービスページと価格表の説得力を受け止める場所です。': 'Form UX is where the persuasion from the service page and pricing page lands.',
  '記事一覧へ戻る': 'Back to article list',
  '色、余白、文字、角丸、影を感覚で管理すると、ページが増えるほど微差が積もります。Design Tokenは、その微差をチームで直せる言語に変える仕組みです。': 'When color, spacing, type, radii, and shadows are managed by feel, small inconsistencies pile up as pages increase. Design tokens turn those differences into a shared language the team can fix.',
  'トークンは命名より先に、変更される理由を定義すると崩れにくくなります。': 'Tokens stay stronger when you define why they change before worrying about names.',
  '初期設計は“見た目”ではなく“役割”で分ける': 'Design initial tokens by role, not appearance',
  '最初に決めるべきなのは、PrimaryやSecondaryの色名ではありません。その色が何を伝えるために存在するのかです。例えば、行動を促す色、警告する色、背景に沈む色、情報を区切る線。それぞれ役割を持たせると、あとからブランドカラーが変わっても構造を保てます。': 'The first decision is not whether a color is Primary or Secondary. It is what that color exists to communicate: action, warning, background depth, or separators. When every color has a role, the structure survives even if brand colors change later.',
  'Figmaでは、Primitive TokenとSemantic Tokenを分けると運用しやすくなります。Primitiveは実数値、Semanticは用途です。デザイナーが触るのは主にSemanticにし、実装側との対応もそこに寄せます。': 'In Figma, separating primitive tokens from semantic tokens makes operation easier. Primitives are raw values, while semantics describe usage. Designers mostly work with semantics, and implementation can map to the same layer.',
  '運用ルールはコンポーネントの近くに置く': 'Keep usage rules close to components',
  'ルールを別ドキュメントに逃がすと、制作中に読まれません。ボタン、カード、フォームなどのコンポーネントページに、使用するトークンと禁止パターンを短く添えるだけで、レビューの会話がかなり軽くなります。': 'When rules live in a separate document, they are rarely read during production. Add short notes about allowed tokens and forbidden patterns directly to button, card, and form component pages, and reviews become much lighter.',
  'チェックリスト': 'Checklist',
  'CTAの高さは44px以上を目安にする': 'Keep CTA height around 44px or more',
  '本文は16px相当を下回らない': 'Keep body text at roughly 16px or above',
  'フォーカスリングを消さない': 'Do not remove focus rings',
  '余白がコンポーネント単位で再利用できるか': 'Check whether spacing can be reused at component level',
  'ライト/ダークの切り替えに耐えられるか': 'Check whether it survives light/dark switching',
  'このテンプレートは、CMS記事のデザイン解説や制作実績ページにも転用できます。': 'This template can also be reused for CMS design articles and project case pages.',
  'Atelier Grid | Designer Portfolio & CMS Studio': 'Atelier Grid | Designer Portfolio & CMS Studio',
  'FigmaのDesign Tokenを使った運用テンプレート | Atelier Grid': 'A Practical Figma Design Token Template | Atelier Grid',
  'ブランド体験を強化する色彩設計の実務フロー | Atelier Grid': 'A Practical Color Workflow for Stronger Brand Experience | Atelier Grid',
  'Notionでつくるデザイン案件の進行管理ボード | Atelier Grid': 'A Notion Board for Managing Design Projects | Atelier Grid',
  'アクセシビリティを壊さないレスポンシブ実装術 | Atelier Grid': 'Responsive Implementation Without Breaking Accessibility | Atelier Grid',
  'ポートフォリオを受注導線に変える提案ページ構成 | Atelier Grid': 'Turning a Portfolio into a Proposal Flow | Atelier Grid',
  '採用担当者に3分で伝わるケーススタディ設計 | Atelier Grid': 'Case Study Design Recruiters Can Understand in Three Minutes | Atelier Grid',
  'CMS記事をポートフォリオ資産に変える編集カレンダー | Atelier Grid': 'An Editorial Calendar That Turns CMS Posts into Portfolio Assets | Atelier Grid',
  'AI画像生成をWeb制作に組み込むアートディレクション | Atelier Grid': 'Art Direction for Using AI Images in Web Production | Atelier Grid',
  'LPのファーストビューを強くする情報設計 | Atelier Grid': 'Information Architecture for a Stronger Landing Page First View | Atelier Grid',
  'デザインシステムの監査チェックリスト | Atelier Grid': 'Design System Audit Checklist | Atelier Grid',
  '価格表を怖く見せないサービスページ設計 | Atelier Grid': 'Service Page Design That Makes Pricing Feel Clear | Atelier Grid',
  'フリーランスのための問い合わせフォームUX | Atelier Grid': 'Inquiry Form UX for Freelancers | Atelier Grid',
  '色は世界観の飾りではなく、判断を速くするインターフェースです。ブランドの印象とWeb上の行動をつなぐために、色の役割を設計します。': 'Color is not just decoration for a brand world. It is an interface that speeds up decisions, connecting brand impression with behavior on the web.',
  'ブランドカラーは面積比まで決めると、ページ全体の印象が安定します。': 'Brand colors become more stable when you define their area ratio, not just the palette.',
  '色は“どこで使うか”まで決める': 'Decide where each color is used',
  'メインカラーを決めただけでは、実装時に使いどころが散らばります。背景に広く使う色、CTAに使う色、注意を促す色、データを強調する色を分けておくと、LPも記事ページも同じテンションで展開できます。': 'Choosing a main color is not enough. Separate background color, CTA color, warning color, and data emphasis color so landing pages and article pages stay in the same tone.',
  '特にポートフォリオでは、作品画像が主役です。UIの色が作品と競合しないよう、彩度の強い色はアクションとアクセントに限定します。': 'In a portfolio, project imagery is the star. Keep saturated UI colors limited to actions and accents so they do not compete with the work.',
  '美しさと読みやすさを同時に見る': 'Evaluate beauty and readability together',
  '暗い背景に淡い文字を置く場合、見た目は上品でも長文では疲れやすくなります。本文、補足、ラベル、ボタンのコントラストを段階化し、読み手が自然に情報の優先度を判断できる状態を作ります。': 'Light text on a dark background can look elegant but become tiring in long copy. Contrast for body text, notes, labels, and buttons should be layered so readers understand priority naturally.',
  '本文は背景との明度差を強める': 'Keep body text clearly separated from the background',
  'ラベルは彩度ではなくサイズと太さで区別する': 'Differentiate labels with size and weight, not only saturation',
  'CTAは色だけに依存せず余白と配置で目立たせる': 'Make CTAs stand out with spacing and placement, not color alone',
  '最後は実際の画面で検証する': 'Validate on real screens at the end',
  'カラーパレットだけを眺めても、Web上の強さは判断できません。ファーストビュー、カード、フォーム、記事本文、フッターに置いた時の見え方を確認し、必要なら面積比を調整します。': 'A palette alone cannot tell you how strong it will feel online. Check the first view, cards, forms, article body, and footer, then adjust color area ratios if needed.',
  '色彩設計は、サービスページや価格表の信頼感にも直結します。': 'Color design directly affects trust in service pages and pricing pages.',
  '案件管理は、タスクを並べるだけでは足りません。判断待ち、素材待ち、レビュー待ちを見える化して、手戻りの温度を早めに下げます。': 'Project management is more than listing tasks. Make waiting for decisions, materials, and reviews visible so rework can be reduced early.',
  'ボードは“今どこか”より、“次に誰が何を判断するか”が見えると強い。': 'A strong board shows not just where work is, but who decides what next.',
  '列は工程名ではなく状態で分ける': 'Separate columns by status, not production phase',
  '「ヒアリング」「デザイン」「実装」と工程だけで分けると、止まっている理由が見えません。おすすめは、Backlog、Doing、Waiting Review、Waiting Material、Doneのように、次の行動が分かる列にすることです。': 'If columns are only Discovery, Design, and Implementation, you cannot see why work is stuck. Use columns like Backlog, Doing, Waiting Review, Waiting Material, and Done so the next action is clear.',
  'プロパティは少なく、でも判断に必要なものは残す': 'Keep properties few, but keep what decisions require',
  '担当者、締切、優先度、関連URL、確認者、決定ログ。最初から項目を増やしすぎると更新されなくなりますが、レビューで必要な情報が不足するとやり取りが増えます。': 'Owner, deadline, priority, related URL, reviewer, and decision log. Too many fields stop updates, but too little information increases review back-and-forth.',
  'レビューは“戻す理由”をテンプレート化する': 'Template the reasons work gets sent back',
  '修正依頼の粒度が揃うと、制作側もクライアント側も疲れにくくなります。意図、該当箇所、希望する状態、優先度の4点を入力できるフォームを用意しておくと、レビューが進行管理に接続されます。': 'When revision requests have consistent detail, both creators and clients feel less friction. A form for intent, location, desired state, and priority connects review to project management.',
  'このボードは、CMS編集カレンダーにも応用できます。': 'This board can also be adapted into a CMS editorial calendar.',
  'スマホ対応で文字を小さくし、要素を詰め込むほど、体験は脆くなります。美しいレイアウトを保ちながら、読める・押せる・迷わない状態を作ります。': 'The more mobile design shrinks text and packs elements, the more fragile the experience becomes. The goal is to keep it readable, tappable, and clear while preserving beauty.',
  'レスポンシブは幅の調整ではなく、優先度の再編集です。': 'Responsive design is not width adjustment. It is priority editing.',
  '小さい画面では情報の順番を変える': 'Reorder information on small screens',
  'デスクトップの横並びをそのまま縦に積むと、重要なCTAが遠くなります。スマホでは、導入文、証拠、主要アクション、詳細の順に再編集し、読み手が迷わない流れを作ります。': 'Simply stacking a desktop layout can push key CTAs too far down. On mobile, reorder intro, proof, primary action, and details so readers never lose the path.',
  '押せるサイズと間隔を確保する': 'Secure tappable size and spacing',
  'アイコンやリンクが近すぎると、見た目が整っていても操作で失敗します。ボタンは高さを安定させ、カード全体をリンクにする場合もフォーカス状態を見えるようにします。': 'If icons or links sit too close together, interaction fails even when the design looks polished. Keep buttons stable in height and make focus states visible, even on linked cards.',
  '実機に近い幅で最後に見る': 'Check at real-device-like widths at the end',
  'ブラウザの幅を狭めるだけでなく、390px前後のスマホ幅、768px前後のタブレット幅、1440px以上のデスクトップ幅で確認します。文字の重なり、画像の切れ、固定ヘッダーの干渉を重点的に見ます。': 'Do not just narrow the browser. Check around 390px mobile, 768px tablet, and 1440px+ desktop, watching for overlapping text, cropped images, and sticky-header interference.',
  'ポートフォリオは“作品を見せる場所”であると同時に、“相談する理由を育てる場所”です。実績、強み、進め方、安心材料を順番に置きます。': 'A portfolio is both a place to show work and a place to build reasons to inquire. Place results, strengths, process, and reassurance in order.',
  '依頼につながるページは、売り込みより先に不安を取り除いています。': 'Pages that lead to inquiries remove anxiety before they sell.',
  '先に“何が得意か”を言い切る': 'State what you are good at first',
  '幅広くできます、だけでは選ばれにくくなります。LP制作、ブランド整理、CMS設計、UI改善など、相手が依頼内容を想像できる言葉で強みを提示します。その直後に代表的な成果物を置くと、理解の速度が上がります。': '“I can do many things” is hard to choose. Present strengths in concrete terms like landing pages, brand systems, CMS design, and UI improvement, then show representative deliverables right after.',
  '実績は完成画面だけでなく、判断の過程も見せる': 'Show not only final screens, but the decision process',
  '美しい画面は強い証拠ですが、それだけでは再現性が伝わりません。課題、制約、仮説、検証、成果を短く添えることで、単なるギャラリーから提案資料に変わります。': 'Beautiful screens are strong proof, but they do not show repeatability by themselves. Add problems, constraints, hypotheses, tests, and outcomes to turn a gallery into proposal material.',
  'CTAは一箇所に頼らない': 'Do not rely on a single CTA',
  '問い合わせボタンはページ下部だけでなく、納得が高まる節目に置きます。ただし、すべてを強いボタンにすると圧が出るため、記事一覧や制作プロセスへの導線も混ぜると自然です。': 'Place inquiry buttons not only at the bottom, but also where conviction rises. Mix in links to articles and process so the page does not feel too pushy.',
  '提案ページは価格表や問い合わせフォームとセットで設計すると効果が高まります。': 'Proposal pages work better when designed together with pricing and inquiry forms.',
  '忙しい読み手は、全ての制作意図を読みません。最初の3分で担当範囲、課題、成果、強みが見える構成を作ります。': 'Busy readers do not read every design intention. Structure the page so scope, problem, outcome, and strengths are visible within the first three minutes.',
  'ケーススタディは長さより、最初の要約の質で読まれ方が決まります。': 'A case study is shaped less by length and more by the quality of its opening summary.',
  '冒頭に“この案件で証明したこと”を書く': 'Start by writing what this project proves',
  '制作物のタイトルだけでは、読み手は評価軸を持てません。「予約率改善のためのLP」「採用応募を増やすブランド刷新」のように、何に貢献した仕事なのかを一文で示します。': 'A project title alone gives readers no evaluation frame. State what the work contributed to, such as a landing page for improving bookings or a brand refresh for increasing applications.',
  '成果は数字と判断で補強する': 'Support outcomes with numbers and decisions',
  '数字がある場合はもちろん強いですが、全案件で公開できるとは限りません。その場合は、制約、比較案、採用した理由、却下した理由を短く残すと、実務での思考が伝わります。': 'Numbers are powerful when available, but not every project can disclose them. In that case, show constraints, alternatives, why one option was chosen, and why another was rejected.',
  '担当範囲を明記する': 'Clarify your scope',
  '課題と成果を一画面内に置く': 'Place problem and result in the same view',
  '画面キャプチャだけでなく検討過程を見せる': 'Show the thinking process, not just screenshots',
  '読み飛ばされる前提でレイアウトする': 'Lay out the page assuming people skim',
  '見出しだけを追っても話が通じる構成にすると、短時間でも印象に残ります。詳細なプロセスは下部へ逃がし、冒頭は要約と成果に寄せます。': 'If headings alone tell the story, the page leaves an impression even in a short read. Move detailed process lower and keep the top focused on summary and results.',
  'ケーススタディは、提案ページと合わせると受注導線として強くなります。': 'Case studies become stronger inquiry paths when paired with proposal pages.',
  '記事は増やせばいいわけではありません。専門性、制作姿勢、相談につながるテーマを計画的に蓄積します。': 'More articles are not automatically better. Build themes that accumulate expertise, design attitude, and reasons to inquire.',
  '編集カレンダーは、書く予定ではなく営業資産の設計図です。': 'An editorial calendar is not just a writing schedule. It is a blueprint for sales assets.',
  'テーマは依頼されたい仕事から逆算する': 'Work backward from the work you want to receive',
  'UI改善の相談が欲しいなら、UIの判断プロセスを書く。ブランド案件を増やしたいなら、色や言葉の設計について書く。記事テーマは自分の興味だけでなく、未来の依頼内容に接続させます。': 'If you want UI improvement inquiries, write about UI decision processes. If you want more branding work, write about color and language design. Article themes should connect to future inquiries, not only personal interest.',
  '更新頻度は“続く密度”にする': 'Choose a cadence you can sustain',
  '毎日書くより、月に数本でも読み応えのある記事を安定して出す方が信頼につながります。短いメモ、深い解説、ケーススタディを混ぜると負荷が分散します。': 'Publishing a few substantial articles consistently can build more trust than writing every day. Mix short notes, deep explanations, and case studies to spread the workload.',
  '記事はSNS、提案書、面談で再利用する': 'Reuse articles in social posts, proposals, and meetings',
  'よく聞かれる質問への回答を記事化しておくと、問い合わせ対応が楽になります。記事一覧は、単なるブログではなく、思考のポートフォリオとして機能します。': 'Turning frequently asked questions into articles makes inquiry handling easier. The article list becomes a portfolio of thinking, not just a blog.',
  'CMS記事は検索とタグが整っているほど、長く働きます。': 'CMS articles work longer when search and tags are well structured.',
  '生成画像は強力ですが、ただ置くだけだと装飾で終わります。ブランドの温度、情報設計、トリミング方針まで決めて使います。': 'Generated images are powerful, but if they are only placed on the page, they remain decoration. Use them with a defined brand temperature, information role, and cropping policy.',
  '生成画像は、プロンプトより先に使う場所を決めると仕上がりが安定します。': 'Generated visuals become more stable when you decide where they will be used before writing the prompt.',
  'プロンプトはページ内の役割から書く': 'Write prompts from the image’s role on the page',
  'ヒーロー背景なのか、記事サムネイルなのか、ケーススタディの補助画像なのか。使う場所によって必要な余白、情報量、明暗が変わります。Web用の画像は、文字を重ねる位置まで想定して生成します。': 'A hero background, article thumbnail, and case-study support image all need different spacing, information density, and contrast. Web images should be generated with text overlay positions in mind.',
  'トリミングされても意味が残る構図にする': 'Compose images so meaning survives cropping',
  'レスポンシブでは画像の見え方が変わります。中央に重要要素を詰めすぎず、左右どちらかに余白を作ると、PCでもスマホでも扱いやすくなります。': 'Responsive layouts change how images are seen. Avoid packing important elements into the center, and leave space on one side so the image works on both desktop and mobile.',
  '最後は“ブランドらしいか”で見る': 'Judge the final result by brand fit',
  '高品質に見えても、サイト全体の言葉や色と噛み合っていなければ浮きます。彩度、コントラスト、素材感、余白がページのUIと同じ方向を向いているかを確認します。': 'Even high-quality visuals feel wrong if they do not match the site’s language and color. Check saturation, contrast, texture, and spacing against the UI direction.',
  'このサイトでは、ヒーロー、制作プロセス、CMS画面の3点に生成ビジュアルを使用しています。': 'This site uses generated visuals for the hero, production process, and CMS screen.',
  '強いファーストビューは、派手な見た目だけで成立しません。誰に何を約束するページなのかを、一瞬で判断できる必要があります。': 'A strong first view is not only about visual impact. Readers must instantly understand who the page is for and what it promises.',
  'ファーストビューは、かっこよさより先に“読む理由”を作ります。': 'A first view must create a reason to read before it tries to look cool.',
  'H1は価値を曖昧にしない': 'Do not make the H1 vague',
  '抽象的なコピーは雰囲気を作れますが、読み手が自分ごと化できないとスクロールされません。何のサイトで、誰に向けて、何が得られるのかを補足文で具体化します。': 'Abstract copy can create atmosphere, but readers will not scroll unless they can see themselves in it. Supporting copy should clarify what the site is, who it is for, and what they gain.',
  '最初の画面に小さな証拠を置く': 'Place small proof in the first screen',
  '実績数、対応領域、代表ビジュアル、導入先、制作年など、信頼の手がかりを置くとページの温度が上がります。数字がない場合も、制作プロセスや成果物の種類を明記できます。': 'Project counts, service areas, representative visuals, clients, or production years add trust signals. If numbers are unavailable, show process and deliverable types.',
  'CTAは次のスクロールと競合させない': 'Do not make the CTA compete with the next scroll',
  'すぐ問い合わせる人だけではありません。作品を見る、記事を読む、制作プロセスを見るなど、温度差のある行動を用意すると離脱を防げます。': 'Not everyone is ready to inquire immediately. Offer actions with different levels of intent, such as viewing work, reading articles, or checking the process.',
  'ファーストビューの後は、ケーススタディで説得力を積み上げます。': 'After the first view, case studies build persuasion.',
  'デザインシステムは作って終わりではありません。ページが増えた時に崩れていないか、定期的に観察できる仕組みが必要です。': 'A design system is not finished when it is created. It needs a way to regularly observe whether it still holds as pages increase.',
  '監査は粗探しではなく、チームが速く作るための整備です。': 'Auditing is not fault-finding. It is maintenance that helps the team build faster.',
  'まず監査範囲を絞る': 'Narrow the audit scope first',
  '全画面を一気に見ようとすると、指摘が散らばります。ボタン、フォーム、カード、見出し、余白など、今回は何を見るのかを決めてから確認します。': 'Trying to review every screen at once scatters feedback. Decide whether this audit is about buttons, forms, cards, headings, or spacing before reviewing.',
  'ズレは“理由”ごとに分類する': 'Classify drift by reason',
  '個別対応で起きたズレ、古いルールの残存、実装制約、命名の曖昧さ。原因が違えば直し方も違います。見つけた差分を責めずに、再発しない形へ戻します。': 'Drift can come from one-off fixes, old rules, implementation constraints, or vague naming. Different causes need different fixes, so restore the system without blaming the team.',
  '直接指定された色や余白': 'Hard-coded colors or spacing',
  '似ているが別物になったコンポーネント': 'Components that look similar but behave differently',
  'hover/focus状態の欠落': 'Missing hover or focus states',
  'ドキュメントと実装の不一致': 'Mismatch between documentation and implementation',
  '修正は小さく、合意は明確に': 'Fix in small steps and make agreements clear',
  '監査後は、すぐ直すもの、次回まとめて直すもの、例外として残すものを分けます。全部を理想通りに直そうとすると、運用が止まります。': 'After an audit, separate what to fix now, what to batch later, and what remains as an exception. Trying to make everything ideal at once can stop operation.',
  'Token設計と合わせると、監査の精度がさらに上がります。': 'Pairing this with token design makes audits more precise.',
  '価格は離脱要因にも信頼材料にもなります。金額だけを置くのではなく、範囲、進め方、判断基準を一緒に見せます。': 'Pricing can cause drop-off, but it can also build trust. Show scope, process, and decision criteria together with the price.',
  '価格表は値段を見せる場所ではなく、期待値を揃える場所です。': 'A pricing table is not just where prices appear. It is where expectations align.',
  '価格の前に含まれる範囲を示す': 'Show what is included before showing the price',
  '同じLP制作でも、戦略設計、撮影、実装、CMS、保守の有無で価値は大きく変わります。金額の横に範囲を書くだけで、比較される軸を整えられます。': 'Even for the same landing page, value changes depending on strategy, photography, implementation, CMS, and maintenance. Writing scope beside price shapes the comparison.',
  'プラン比較は“誰向けか”で分ける': 'Compare plans by who they are for',
  '安い・高いだけの比較ではなく、短期公開したい人、ブランドから整えたい人、記事運用まで見たい人など、状況別にプランを見せます。': 'Do not compare only by cheap or expensive. Show plans by situation: quick launch, brand foundation, or article operation.',
  '不安を先回りして書く': 'Answer concerns before they are asked',
  '追加費用、修正回数、納期、素材準備、支払い条件。問い合わせ前に気になることを先に書くと、相談の質が上がります。': 'Additional costs, revision count, timeline, asset preparation, and payment terms. Answering these before inquiry improves the quality of consultation.',
  '価格表の次には、入力しやすい問い合わせフォームが必要です。': 'After pricing, the next need is an easy-to-use inquiry form.'
};

const placeholderTranslations = {
  'Figma、導線、CMSなどで検索': 'Search Figma, flows, CMS, and more',
  '山田 太郎': 'Jane Doe',
  '作りたいもの、困っていること、参考URLなど': 'What you want to build, current issues, reference URLs, and more',
};

function normalize(value) {
  return (value || '').toString().trim().toLowerCase();
}

function getAssetPath(fileName) {
  const inPost = window.location.pathname.includes('/posts/');
  return `${inPost ? '../' : ''}assets/images/${fileName}`;
}

function translateText(value, language) {
  if (language !== 'en') return value;
  const leading = value.match(/^\s*/)?.[0] || '';
  const trailing = value.match(/\s*$/)?.[0] || '';
  const trimmed = value.trim();
  return translations[trimmed] ? `${leading}${translations[trimmed]}${trailing}` : value;
}

function createLanguageToggle() {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks || document.querySelector('.language-toggle')) return;

  const button = document.createElement('button');
  button.className = 'language-toggle';
  button.type = 'button';
  button.innerHTML = `
    <img src="${getAssetPath('language-toggle-ui-cropped.png')}" alt="" aria-hidden="true" />
    <span class="language-code" aria-hidden="true"></span>
    <span class="sr-only">Switch language</span>
  `;
  button.addEventListener('click', () => {
    applyLanguage(currentLanguage === 'ja' ? 'en' : 'ja');
  });
  navLinks.append(button);
}

function collectTranslatableNodes() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });

  translationNodes = [];
  let node = walker.nextNode();
  while (node) {
    translationNodes.push({ node, original: node.nodeValue });
    node = walker.nextNode();
  }
}

function updateLanguageButton() {
  const button = document.querySelector('.language-toggle');
  if (!button) return;
  const nextLanguage = currentLanguage === 'ja' ? 'English' : 'Japanese';
  button.setAttribute('aria-label', `Switch to ${nextLanguage}`);
  button.setAttribute('aria-pressed', String(currentLanguage === 'en'));
  button.querySelector('.language-code').textContent = currentLanguage === 'ja' ? 'EN' : 'JP';
}

function updateTranslatedAttributes() {
  document.querySelectorAll('[placeholder]').forEach((field) => {
    const original = field.dataset.originalPlaceholder || field.getAttribute('placeholder') || '';
    field.dataset.originalPlaceholder = original;
    field.setAttribute('placeholder', currentLanguage === 'en' ? placeholderTranslations[original] || original : original);
  });

  document.querySelectorAll('img[alt]').forEach((image) => {
    const original = image.dataset.originalAlt || image.getAttribute('alt') || '';
    image.dataset.originalAlt = original;
    image.setAttribute('alt', translateText(original, currentLanguage));
  });
}

function updateDocumentTitle() {
  const originalTitle = document.documentElement.dataset.originalTitle || document.title;
  document.documentElement.dataset.originalTitle = originalTitle;
  document.title = currentLanguage === 'en' ? translations[originalTitle] || originalTitle : originalTitle;
}

function applyLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = currentLanguage === 'en' ? 'en' : 'ja';
  document.body.dataset.language = currentLanguage;
  localStorage.setItem('atelier-grid-language', currentLanguage);

  translationNodes.forEach(({ node, original }) => {
    node.nodeValue = translateText(original, currentLanguage);
  });

  updateDocumentTitle();
  updateTranslatedAttributes();
  updateLanguageButton();
  if (formStatus?.textContent.trim()) {
    formStatus.textContent = translateText('入力内容を確認しました。実運用ではNetlify FormsやFormspreeへ接続できます。', currentLanguage);
  }
  filterPosts();
}

function filterPosts() {
  if (!cards.length) return;

  const query = normalize(searchInput?.value);
  const category = categorySelect?.value || 'all';
  let visibleCount = 0;

  cards.forEach((card) => {
    const searchable = normalize([
      card.dataset.search,
      card.textContent,
      card.dataset.tags,
    ].join(' '));
    const tags = normalize(card.dataset.tags).split(/\s+/);
    const matchesText = !query || searchable.includes(query);
    const matchesCategory = category === 'all' || card.dataset.category === category;
    const matchesTag = activeTag === 'all' || tags.includes(activeTag);
    const isVisible = matchesText && matchesCategory && matchesTag;

    card.hidden = !isVisible;
    visibleCount += isVisible ? 1 : 0;
  });

  if (resultCount) {
    resultCount.textContent = currentLanguage === 'en'
      ? `${visibleCount} articles shown`
      : `${visibleCount}件の記事を表示中`;
  }

  if (emptyState) {
    emptyState.hidden = visibleCount !== 0;
  }
}

createLanguageToggle();
collectTranslatableNodes();

tagButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeTag = button.dataset.tag || 'all';
    tagButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
    filterPosts();
  });
});

searchInput?.addEventListener('input', filterPosts);
categorySelect?.addEventListener('change', filterPosts);

inquiryForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!inquiryForm.checkValidity()) {
    inquiryForm.reportValidity();
    return;
  }
  if (formStatus) {
    formStatus.textContent = translateText('入力内容を確認しました。実運用ではNetlify FormsやFormspreeへ接続できます。', currentLanguage);
  }
  inquiryForm.classList.add('is-submitted');
});

applyLanguage(currentLanguage);

function updateReadingProgress() {
  if (!progressBar) return;

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
  progressBar.style.width = `${progress * 100}%`;
}

window.addEventListener('scroll', updateReadingProgress, { passive: true });
window.addEventListener('resize', updateReadingProgress);
updateReadingProgress();

const revealTargets = Array.from(document.querySelectorAll('.reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}
