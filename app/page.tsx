import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cook & Bake — Market Validation",
  description: "Singapore market validation for a 20-course hands-on cooking and baking academy.",
};

const competitors = [
  { name: "ABC Cooking Studio", type: "Trial cooking/baking; seasonal workshops; member courses", price: "S$50–S$198", note: "Public trial S$50 weekday / S$65 weekend; mooncake workshop S$198 non-member.", source: "s1" },
  { name: "Palate Sensations", type: "Asian and Western cooking; parent–child; team events", price: "S$90–S$188", note: "Upcoming confirmed public classes shown on its homepage.", source: "s2" },
  { name: "RedMan Baking Studio", type: "Bread, pastry, cake, festive and parent–child baking", price: "S$68–S$390", note: "Current listings include a S$68 brownie class; catalogue filter reaches S$390.", source: "s3" },
  { name: "Food Playground", type: "Singapore cuisine; tourists; children; corporate team-building", price: "S$70–S$400", note: "Team workshops start at S$70; cultural classes S$120–S$150; two-day youth camp S$400.", source: "s4" },
  { name: "Cookery Magic", type: "Singapore, Nonya and pan-Asian home cooking", price: "S$110–S$130", note: "Three-hour, 3–4 dish public classes; 2–12 participants.", source: "s5" },
  { name: "Grá Baking Academy", type: "Macarons, breads, cakes, pastry and WSQ programmes", price: "S$120–S$840", note: "Published catalogue spans a S$120 macaron class to S$840 WSQ courses.", source: "s6" },
  { name: "ToTT", type: "Chef-led cooking and baking workshops; junior chef", price: "S$118–S$168", note: "Current voucher price S$118; a three-hour chef-led class lists at S$168.", source: "s7" },
];

const courses = [
  ["BAK-101", "Artisan Sourdough", "4 wks", "S$680", "Upper market", "Within Grá’s S$400–S$840 multi-class band"],
  ["BAK-102", "French Pastry & Viennoiserie", "8 wks", "S$1,480", "Premium", "Above observed public-course range"],
  ["BAK-103", "Wedding Cake Design", "6 wks", "S$1,280", "Premium", "Above observed public-course range"],
  ["BAK-104", "Macaron Masterclass", "2 wks", "S$420", "High", "3.5× Grá’s S$120 macaron listing; longer format"],
  ["BAK-105", "Chocolate & Confectionery", "4 wks", "S$760", "Upper market", "Near top of Grá’s multi-class band"],
  ["BAK-106", "Cupcake & Cake Pops", "1 session", "S$220", "Above market", "Above observed S$68–S$198 workshop band"],
  ["BAK-107", "Bread Making Fundamentals", "3 wks", "S$480", "In market", "Inside S$400–S$840 multi-class band"],
  ["BAK-108", "Cookie & Biscuit Baking", "1 session", "S$180", "Upper market", "Inside S$68–S$198 workshop band"],
  ["BAK-109", "Pie & Tart Specialist", "3 wks", "S$560", "In market", "Inside multi-class band"],
  ["BAK-110", "Korean & Asian Bakery", "4 wks", "S$720", "Upper market", "Inside upper multi-class band"],
  ["CUL-201", "Italian Cuisine Mastery", "6 wks", "S$1,180", "Premium", "Above observed public-course range"],
  ["CUL-202", "Thai Street Food", "3 wks", "S$540", "In market", "Multi-session premium; public one-offs are S$110–S$188"],
  ["CUL-203", "Japanese Sushi & Sashimi", "4 wks", "S$980", "Above market", "Above observed S$840 course ceiling"],
  ["CUL-204", "French Culinary Foundations", "8 wks", "S$1,580", "Premium", "Catalogue maximum; above observed public range"],
  ["CUL-205", "Chinese Wok Cooking", "3 wks", "S$520", "In market", "Multi-session premium"],
  ["CUL-206", "Indian Curry & Spices", "3 wks", "S$500", "In market", "Multi-session premium"],
  ["CUL-207", "Healthy Meal Prep", "2 wks", "S$360", "Entry multi", "Below S$400–S$840 multi-class band"],
  ["CUL-208", "Vegetarian & Vegan", "3 wks", "S$540", "In market", "Multi-session premium"],
  ["CUL-209", "Grilling & BBQ", "2 wks", "S$460", "High", "Within multi-class band; S$77 per scheduled hour"],
  ["CUL-210", "Knife Skills", "1 session", "S$160", "In market", "Inside S$68–S$198 workshop band"],
];

const launch = [
  { n: "01", name: "Knife Skills & Kitchen Essentials", price: "S$160 · 3 hours", why: "Lowest-friction entry product. It sits inside the public workshop range and gives every later cooking course a natural upsell." },
  { n: "02", name: "Cookie & Biscuit Baking", price: "S$180 · 3 hours", why: "Accessible, giftable and adaptable to school holidays, Christmas and Lunar New Year. Price is high-but-valid for a public workshop." },
  { n: "03", name: "Artisan Sourdough Bread Baking", price: "S$680 · 12 hours", why: "A proven specialist category: RedMan and Grá both publish artisan-bread offers. The four-week cadence supports visible skill progression." },
  { n: "04", name: "Thai Street Food Cooking", price: "S$540 · 9 hours", why: "Broadly recognisable cuisine and strong social format. It converts the established S$110–S$188 Asian one-off market into a deeper three-week pathway." },
  { n: "05", name: "Healthy Meal Prep & Nutrition", price: "S$360 · 6 hours", why: "A practical weekday-life promise, lower commitment than most multi-session courses, and a useful test of outcome-led positioning beyond entertainment." },
];

export default function Home() {
  return (
    <main>
      <header className="hero" id="top">
        <nav className="nav wrap" aria-label="Report navigation">
          <a className="brand" href="#top"><span>CB</span> Market Validation</a>
          <div className="navlinks">
            <a href="#market">Market</a><a href="#fees">Fees</a><a href="#launch">Launch five</a><a href="#sources">Sources</a>
          </div>
        </nav>
        <div className="wrap heroGrid">
          <div>
            <p className="eyebrow">Singapore · Decision brief · 10 October 2026</p>
            <h1>Cook &amp; Bake<br/><em>Market Validation</em></h1>
            <p className="dek">The concept can support premium, hands-on learning. The catalogue cannot support a cold-start launch of twenty courses across two campuses.</p>
            <div className="verdict"><span>Recommendation</span><strong>Open with five courses at one operating hub; earn the second campus.</strong></div>
          </div>
          <div className="scorecard" aria-label="Catalogue summary">
            <div><strong>20</strong><span>proposed courses</span></div>
            <div><strong>S$540</strong><span>median fee</span></div>
            <div><strong>S$160–1,580</strong><span>catalogue range</span></div>
            <div><strong>12</strong><span>seats per class</span></div>
            <p>Catalogue figures: Cook &amp; Bake proposal, supplied 10 Oct 2026.<sup><a href="#s0">0</a></sup></p>
          </div>
        </div>
      </header>

      <section className="wrap summary" id="summary">
        <div className="sectionHead"><p>01 / Summary</p><h2>A market exists. The opening range is the risk.</h2></div>
        <div className="thesisGrid">
          <article className="thesis primary"><span>What the evidence says</span><h3>Public workshops cluster below S$200. Longer skills programmes reach S$840.</h3><p>Observed public listings span S$68–S$198 for common one-off workshops, while Grá publishes multi-class and WSQ offers from S$400 to S$840.<sup><a href="#s1">1</a></sup><sup><a href="#s3">3</a></sup><sup><a href="#s6">6</a></sup></p></article>
          <article className="thesis"><span>Portfolio implication</span><h3>Seven proposed fees are upper-market, above-market or premium.</h3><p>The issue is not just price: advanced commitments need trust, proof and a reliable acquisition funnel before launch.<sup><a href="#s0">0</a></sup></p></article>
          <article className="thesis"><span>Go-to-market implication</span><h3>Sell outcomes, not a menu of recipes.</h3><p>Lead with competence, take-home output and progression. Avoid relying on SkillsFuture: personal-enrichment lifestyle courses can be excluded from funding.<sup><a href="#s13">13</a></sup></p></article>
        </div>
      </section>

      <section className="paper" id="personas"><div className="wrap">
        <div className="sectionHead"><p>02 / Personas</p><h2>Three buyers, three different jobs-to-be-done.</h2></div>
        <div className="personaGrid">
          <article><div className="personaIcon">01</div><p className="tag">Core buyer</p><h3>The serious home improver</h3><p>Time-poor working adult who has outgrown online recipes and wants tactile correction, repeatable technique and a visible result.</p><dl><dt>Will pay for</dt><dd>Small classes, expert feedback, progression</dd><dt>Best fit</dt><dd>Bread, wok, curry, meal prep</dd><dt>Trigger</dt><dd>New hobby, health goal, hosting confidence</dd></dl></article>
          <article><div className="personaIcon">02</div><p className="tag">Volume buyer</p><h3>The social experience seeker</h3><p>Couple, friend pair or parent–child buyer choosing a memorable activity rather than formal training. Competitors explicitly package pair and family formats.<sup><a href="#s2">2</a></sup><sup><a href="#s3">3</a></sup></p><dl><dt>Will pay for</dt><dd>Convenience, fun, photogenic take-homes</dd><dt>Best fit</dt><dd>Cookies, cupcakes, Thai street food</dd><dt>Trigger</dt><dd>Weekend plans, gifting, school holidays</dd></dl></article>
          <article><div className="personaIcon">03</div><p className="tag">Channel buyer</p><h3>The organiser or visitor</h3><p>HR lead buying team bonding, or traveller seeking a distinctly Singapore experience. Singapore recorded 16.9m visitors in 2025; STB forecasts 17–18m in 2026.<sup><a href="#s8">8</a></sup></p><dl><dt>Will pay for</dt><dd>Turnkey logistics, dietary clarity, local story</dd><dt>Best fit</dt><dd>Private versions of Asian courses</dd><dt>Trigger</dt><dd>Offsite, incentive trip, cultural itinerary</dd></dl></article>
        </div>
      </div></section>

      <section className="wrap" id="market">
        <div className="sectionHead"><p>03 / Competitor set</p><h2>Published pricing shows two markets: experiences and skill pathways.</h2></div>
        <div className="tableWrap"><table className="competitorTable"><thead><tr><th>Provider</th><th>Course types</th><th>Published range</th><th>What the range represents</th></tr></thead><tbody>
          {competitors.map((c) => <tr key={c.name}><th>{c.name}</th><td>{c.type}</td><td className="money">{c.price}<sup><a href={`#${c.source}`}>{c.source.slice(1)}</a></sup></td><td>{c.note}</td></tr>)}
        </tbody></table></div>
        <p className="method">Ranges use currently visible public prices, not a claim about each provider’s complete catalogue. Accessed 10 Oct 2026; GST treatment varies by provider.</p>
      </section>

      <section className="ink" id="fees"><div className="wrap">
        <div className="sectionHead inverse"><p>04 / Our fees against market</p><h2>The centre of the catalogue is defensible. The top end needs proof.</h2></div>
        <div className="feeBand">
          <div><span>Entry workshops</span><strong>3 courses</strong><small>S$160–S$220</small></div>
          <div><span>Core multi-session</span><strong>9 courses</strong><small>S$360–S$560</small></div>
          <div><span>Upper market</span><strong>4 courses</strong><small>S$680–S$980</small></div>
          <div><span>Premium programmes</span><strong>4 courses</strong><small>S$1,180–S$1,580</small></div>
        </div>
        <div className="feeTableWrap"><table className="feeTable"><thead><tr><th>Code</th><th>Course</th><th>Format</th><th>Fee</th><th>Position</th><th>Closest published benchmark</th></tr></thead><tbody>
          {courses.map((c) => <tr key={c[0]}><td>{c[0]}</td><th>{c[1]}</th><td>{c[2]}</td><td>{c[3]}<sup><a href="#s0">0</a></sup></td><td><span className={`pill ${c[4].toLowerCase().replace(" ", "-")}`}>{c[4]}</span></td><td>{c[5]}<sup><a href="#s14">14</a></sup></td></tr>)}
        </tbody></table></div>
        <p className="method light">Positioning is directional: providers differ in duration, ingredients, accreditation, class size and GST. “Observed public range” combines cited listings in the competitor table; it is not a statistical market average.<sup><a href="#s14">14</a></sup></p>
      </div></section>

      <section className="wrap" id="demand">
        <div className="sectionHead"><p>05 / Demand &amp; seasonality</p><h2>Demand is visible—but channelled into distinct peaks.</h2></div>
        <div className="signalGrid">
          <article><p className="signalNo">16.9m</p><h3>Experience economy tailwind</h3><p>Singapore’s 2025 international arrivals grew 2.3%; STB forecasts 17–18m arrivals in 2026. A local-food visitor product has a large addressable flow.<sup><a href="#s8">8</a></sup></p></article>
          <article><p className="signalNo">100k+</p><h3>Category proof</h3><p>Food Playground reports more than 100,000 customers and 2,300+ Tripadvisor reviews for its cultural cooking proposition. Treat these as provider-reported figures.<sup><a href="#s4">4</a></sup></p></article>
          <article><p className="signalNo">18</p><h3>Active baking breadth</h3><p>RedMan’s Sims Lane collection listed 18 products, with durations from 2 to 12 hours—evidence of ongoing supply across beginner to advanced formats.<sup><a href="#s3">3</a></sup></p></article>
        </div>
        <div className="seasonGrid">
          <div className="seasonCopy"><p className="tag">Operating calendar</p><h3>Build campaigns around four demand windows.</h3><p>Family demand should concentrate around the 2026 school breaks: 14–22 Mar, 30 May–28 Jun, 5–13 Sep and 21 Nov–31 Dec.<sup><a href="#s9">9</a></sup></p><p>Festive baking creates shorter spikes. In 2026, operators listed dedicated Mid-Autumn mooncake workshops from S$98 to S$198.<sup><a href="#s10">10</a></sup><sup><a href="#s11">11</a></sup><sup><a href="#s12">12</a></sup></p></div>
          <div className="calendar" aria-label="Seasonal demand calendar">
            <div><b>Jan–Feb</b><span className="hot">Lunar New Year</span><small>cookies · gifting</small></div>
            <div><b>Mar</b><span className="warm">School break</span><small>family workshops</small></div>
            <div><b>Jun</b><span className="hot">Long school break</span><small>camps · parent–child</small></div>
            <div><b>Aug–Sep</b><span className="hot">Mid-Autumn</span><small>mooncakes · gifting</small></div>
            <div><b>Nov–Dec</b><span className="hot">Year-end peak</span><small>festive bakes · teams</small></div>
            <div><b>Other months</b><span className="cool">Evergreen</span><small>skills · tourists · corporate</small></div>
          </div>
        </div>
      </section>

      <section className="paper" id="launch"><div className="wrap">
        <div className="sectionHead"><p>06 / Launch recommendation</p><h2>Five courses form a ladder—not five unrelated bets.</h2></div>
        <div className="launchList">{launch.map((x) => <article key={x.n}><span className="launchNo">{x.n}</span><div><p>{x.price}<sup><a href="#s0">0</a></sup></p><h3>{x.name}</h3></div><p className="launchWhy">{x.why}<sup><a href="#s14">14</a></sup></p></article>)}</div>
        <div className="sequence"><span>Acquire</span><b>Knife / Cookies</b><i>→</i><span>Retain</span><b>Thai / Meal Prep</b><i>→</i><span>Graduate</span><b>Sourdough</b></div>
      </div></section>

      <section className="wrap" id="risks">
        <div className="sectionHead"><p>07 / Risks</p><h2>Three assumptions must be tested before committing to two campuses.</h2></div>
        <div className="riskGrid">
          <article><span>01</span><h3>Seat utilisation</h3><p>Twenty courses fragment acquisition and timetable demand. A 12-seat cap protects quality but leaves little room for weak-fill classes.<sup><a href="#s0">0</a></sup></p><strong>Test: paid deposits by course and time slot.</strong></article>
          <article><span>02</span><h3>Premium credibility</h3><p>Six courses are priced above S$760, while the highest observed Grá public listing is S$840.<sup><a href="#s0">0</a></sup><sup><a href="#s6">6</a></sup></p><strong>Test: conversion with instructor proof and outcomes.</strong></article>
          <article><span>03</span><h3>Fixed-cost duplication</h3><p>Two fitted kitchens multiply rent, equipment and staffing before repeat demand is known. No operating-cost figures were supplied: <b>UNKNOWN</b>.</p><strong>Test: one-hub cohorts plus pop-ups first.</strong></article>
        </div>
      </section>

      <footer id="sources"><div className="wrap">
        <div className="sectionHead inverse"><p>08 / Sources</p><h2>Evidence ledger</h2></div>
        <ol className="sources">
          <li id="s0"><b>0</b><span><strong>Cook &amp; Bake Academy proposed catalogue</strong> — 20 courses, fees, duration, campus and class size. User-supplied CSV, 10 Oct 2026. Public link: <b>UNKNOWN</b>.</span></li>
          <li id="s1"><b>1</b><span><a href="https://abc-cooking.com.sg/lessons/trial" target="_blank" rel="noreferrer">ABC Cooking Studio trial lessons</a> and <a href="https://booking.abc-cooking.com.sg/event/funan_mooncake_2509/" target="_blank" rel="noreferrer">mooncake workshop</a>. Accessed 10 Oct 2026.</span></li>
          <li id="s2"><b>2</b><span><a href="https://www.palatesensations.com/" target="_blank" rel="noreferrer">Palate Sensations upcoming confirmed classes</a>. Accessed 10 Oct 2026.</span></li>
          <li id="s3"><b>3</b><span><a href="https://shop.redmanshop.com/collections/sims-lane-classes" target="_blank" rel="noreferrer">RedMan Baking Studio, Sims Lane classes</a> and <a href="https://shop.redmanshop.com/collections/classes/products/ube-brownie-ube0003" target="_blank" rel="noreferrer">Ube brownie listing</a>. Accessed 10 Oct 2026.</span></li>
          <li id="s4"><b>4</b><span><a href="https://www.foodplayground.com.sg/cultural-cooking-class.html" target="_blank" rel="noreferrer">Food Playground cultural class</a>, <a href="https://www.foodplayground.com.sg/team-building.html" target="_blank" rel="noreferrer">team-building</a> and <a href="https://www.foodplayground.com.sg/kids-holiday-cooking-classes.html" target="_blank" rel="noreferrer">holiday camp</a>. Accessed 10 Oct 2026.</span></li>
          <li id="s5"><b>5</b><span><a href="https://cookerymagic.com/daily-cooking-classes/" target="_blank" rel="noreferrer">Cookery Magic daily classes</a>. Accessed 10 Oct 2026.</span></li>
          <li id="s6"><b>6</b><span><a href="https://grabakingacademy.com/classes/" target="_blank" rel="noreferrer">Grá Baking Academy class catalogue</a>. Accessed 10 Oct 2026.</span></li>
          <li id="s7"><b>7</b><span><a href="https://tottstore.com/classes/tott-x-ksd-brunch-like-a-chef/" target="_blank" rel="noreferrer">ToTT chef-led class</a> and <a href="https://uplay.com.sg/products/cooking-and-baking-class-with-philia-ng" target="_blank" rel="noreferrer">UPlay ToTT class voucher</a>. Accessed 10 Oct 2026.</span></li>
          <li id="s8"><b>8</b><span><a href="https://www.stb.gov.sg/about-stb/media-publications/media-centre/record-singapore-tourism-receipts-from-january-to-september-2025/" target="_blank" rel="noreferrer">Singapore Tourism Board, 2025 tourism performance</a>. Published 3 Feb 2026; accessed 10 Oct 2026.</span></li>
          <li id="s9"><b>9</b><span><a href="https://www.yangzhengpri.moe.edu.sg/files/MK%20YZ%20Files/School_Terms_Holidays_and_Closure_Dates.pdf" target="_blank" rel="noreferrer">MOE school terms and holidays for 2026</a>. Published 2026; accessed 10 Oct 2026.</span></li>
          <li id="s10"><b>10</b><span><a href="https://www.dopenkitchen.com.sg/mid-autumn-mooncake-masterclass/" target="_blank" rel="noreferrer">D’Open Kitchen mooncake masterclass</a>. 2026 dates; accessed 10 Oct 2026.</span></li>
          <li id="s11"><b>11</b><span><a href="https://www.aci.edu.sg/training-for-individuals/short-courses/pastry-baking/Artisan-Mooncakes" target="_blank" rel="noreferrer">Asian Culinary Institute artisan mooncakes</a>. 2026 intake; accessed 10 Oct 2026.</span></li>
          <li id="s12"><b>12</b><span><a href="https://www.sace.org.sg/course/mid-autumn-mooncake-making/" target="_blank" rel="noreferrer">SACE mooncake workshop</a>. Course date 15 Sep 2026; accessed 10 Oct 2026.</span></li>
          <li id="s13"><b>13</b><span><a href="https://www.tpgateway.gov.sg/plan-courses/ssg-funding" target="_blank" rel="noreferrer">Training Partners Gateway, SSG funding guidance</a>. Accessed 10 Oct 2026.</span></li>
          <li id="s14"><b>14</b><span><strong>Codex analysis of cited public listings</strong> — directional fee bands and launch recommendations, 10 Oct 2026. Not a statistically representative market survey.</span></li>
        </ol>
        <div className="footerBottom"><p>Cook &amp; Bake — Market Validation</p><a href="#top">Back to top ↑</a></div>
      </div></footer>
    </main>
  );
}
