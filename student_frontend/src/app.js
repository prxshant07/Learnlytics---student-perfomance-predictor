import React, { useState, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { BookOpen, TrendingUp, Award, AlertCircle, ArrowRight, Check, Clock, Users, Target, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --duration-fast: 120ms;
    --duration-base: 220ms;
    --duration-slow: 400ms;
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --radius-sm: 6px;
    --radius-md: 10px;
    --radius-lg: 16px;
    --radius-xl: 24px;
    --ink: #0a0a0f;
    --ink-2: #3d3d4e;
    --ink-3: #7b7b8f;
    --ink-4: #b0b0c0;
    --surface: #ffffff;
    --surface-2: #f7f7fb;
    --surface-3: #f0f0f6;
    --border: #e4e4ef;
    --border-2: #d0d0e0;
    --accent: #5b5bd6;
    --accent-2: #7c7ce8;
    --accent-3: #e8e8ff;
    --accent-glow: rgba(91,91,214,0.18);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: var(--surface-2);
    color: var(--ink);
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    from { background-position: 200% 0; }
    to   { background-position: -200% 0; }
  }
  @keyframes floatA {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    50%      { transform: translateY(-18px) rotate(4deg); }
  }
  @keyframes floatB {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    50%      { transform: translateY(-12px) rotate(-3deg); }
  }
  @keyframes floatC {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-22px); }
  }
  @keyframes pulseRing {
    0%   { transform: scale(0.95); opacity: 0.8; }
    70%  { transform: scale(1.15); opacity: 0; }
    100% { transform: scale(1.15); opacity: 0; }
  }
  @keyframes progressFill {
    from { width: 0; }
  }
  @keyframes gradientShift {
    0%,100% { background-position: 0% 50%; }
    50%      { background-position: 100% 50%; }
  }

  .anim-fade-up    { animation: fadeUp   var(--duration-slow) var(--ease-out) both; }
  .anim-fade-in    { animation: fadeIn   var(--duration-base) ease both; }
  .anim-scale-in   { animation: scaleIn  var(--duration-slow) var(--ease-spring) both; }
  .anim-slide-down { animation: slideDown var(--duration-base) var(--ease-out) both; }

  .stagger > * { animation-delay: calc(var(--i,0) * 80ms); }

  /* ── Grade card ── */
  .grade-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding: 0;
    border-radius: 20px;
    border: 1.5px solid var(--border);
    background: var(--surface);
    cursor: pointer;
    font-family: inherit;
    overflow: hidden;
    transition:
      border-color var(--duration-base) ease,
      transform    var(--duration-base) var(--ease-spring),
      box-shadow   var(--duration-base) ease;
  }
  .grade-card:hover {
    border-color: var(--accent-2);
    transform: translateY(-4px);
    box-shadow: 0 20px 48px rgba(91,91,214,0.12), 0 4px 12px rgba(0,0,0,0.06);
  }
  .grade-card:active { transform: scale(0.98) translateY(0); }
  .grade-card .card-banner {
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 52px;
    position: relative;
    overflow: hidden;
  }
  .grade-card .card-body {
    padding: 20px 24px 24px;
    text-align: left;
    width: 100%;
  }
  .grade-card .card-tag {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .grade-card .card-title {
    font-family: 'Sora', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 6px;
    letter-spacing: -0.02em;
  }
  .grade-card .card-desc {
    font-size: 13px;
    color: var(--ink-3);
    line-height: 1.5;
  }
  .grade-card .card-arrow {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--accent-3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent);
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity var(--duration-base) ease, transform var(--duration-base) var(--ease-spring);
  }
  .grade-card:hover .card-arrow {
    opacity: 1;
    transform: translateX(0);
  }
  .grade-card .float-icon {
    position: absolute;
    font-size: 32px;
    opacity: 0.12;
    pointer-events: none;
  }

  /* ── Input page ── */
  .section-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: var(--accent-3);
    color: var(--accent);
    margin-bottom: 14px;
  }
  .metric-input-card {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 20px 22px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: border-color var(--duration-base) ease, box-shadow var(--duration-base) ease;
    position: relative;
    overflow: hidden;
  }
  .metric-input-card:focus-within {
    border-color: var(--accent-2);
    box-shadow: 0 0 0 4px var(--accent-glow);
  }
  .metric-input-card .mcard-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
  }
  .metric-input-card .mcard-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--ink-2);
    letter-spacing: 0.01em;
  }
  .metric-input-card .mcard-hint {
    font-size: 11px;
    color: var(--ink-4);
  }
  .metric-input-card .mcard-inp {
    width: 100%;
    padding: 10px 0;
    border: none;
    border-top: 1.5px solid var(--border);
    background: transparent;
    font-size: 22px;
    font-weight: 600;
    font-family: 'Sora', sans-serif;
    color: var(--ink);
    outline: none;
    letter-spacing: -0.02em;
    transition: border-color var(--duration-fast) ease;
  }
  .metric-input-card:focus-within .mcard-inp { border-color: var(--accent); }
  .metric-input-card .mcard-inp::placeholder { color: var(--ink-4); font-weight: 400; font-size: 18px; }

  .subject-chip {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 18px;
    border-radius: 12px;
    border: 1.5px solid var(--border);
    background: var(--surface);
    color: var(--ink-2);
    font-family: inherit;
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    transition:
      border-color var(--duration-fast) ease,
      background   var(--duration-fast) ease,
      color        var(--duration-fast) ease,
      transform    var(--duration-fast) var(--ease-spring),
      box-shadow   var(--duration-fast) ease;
    text-align: left;
    position: relative;
    overflow: hidden;
  }
  .subject-chip::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--accent);
    opacity: 0;
    transition: opacity var(--duration-fast) ease;
  }
  .subject-chip:hover {
    border-color: var(--accent-2);
    background: var(--accent-3);
    color: var(--accent);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px var(--accent-glow);
  }
  .subject-chip.active {
    border-color: var(--accent);
    background: var(--accent);
    color: #fff;
    box-shadow: 0 4px 16px var(--accent-glow);
  }
  .subject-chip:active { transform: scale(0.97); }
  .subject-chip .chip-check {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1.5px solid currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background var(--duration-fast) ease;
  }
  .subject-chip.active .chip-check { background: rgba(255,255,255,0.25); border-color: transparent; }

  .score-input-row {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 14px;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: border-color var(--duration-base) ease, box-shadow var(--duration-base) ease;
  }
  .score-input-row:focus-within {
    border-color: var(--accent-2);
    box-shadow: 0 0 0 4px var(--accent-glow);
  }
  .score-input-row .score-label {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .score-input-row .score-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
  }
  .score-input-row .score-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--ink);
  }
  .score-input-row .score-inp {
    width: 110px;
    padding: 8px 12px;
    border: 1.5px solid var(--border);
    border-radius: 10px;
    background: var(--surface-2);
    font-size: 15px;
    font-weight: 600;
    font-family: 'Sora', sans-serif;
    color: var(--ink);
    text-align: right;
    outline: none;
    transition: border-color var(--duration-fast) ease, box-shadow var(--duration-fast) ease;
  }
  .score-input-row .score-inp:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-glow);
    background: #fff;
  }
  .score-input-row .score-inp::placeholder { color: var(--ink-4); font-weight: 400; }
  .score-input-row .score-unit {
    font-size: 12px;
    color: var(--ink-4);
    font-weight: 500;
    white-space: nowrap;
  }

  .submit-btn {
    width: 100%;
    padding: 16px;
    border-radius: 14px;
    border: none;
    background: var(--accent);
    color: #fff;
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    letter-spacing: -0.01em;
    position: relative;
    overflow: hidden;
    transition: opacity var(--duration-fast) ease, transform var(--duration-fast) var(--ease-spring);
    background-size: 200% 200%;
  }
  .submit-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
    pointer-events: none;
  }
  .submit-btn:hover { opacity: 0.92; transform: translateY(-1px); }
  .submit-btn:active { transform: scale(0.98); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
    display: inline-block;
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13.5px;
    font-weight: 500;
    color: var(--ink-3);
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px 0;
    font-family: inherit;
    transition: color var(--duration-fast) ease;
  }
  .back-btn:hover { color: var(--ink); }

  /* results page */
  .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; letter-spacing: 0.03em; }
  .badge-green  { background: #dcfce7; color: #166534; }
  .badge-red    { background: #fee2e2; color: #991b1b; }
  .badge-indigo { background: #e0e7ff; color: #3730a3; }
  .card { background: #ffffff; border: 1px solid #f1f5f9; border-radius: var(--radius-xl); box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.04); }
  .metric-card { border-radius: var(--radius-lg); padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 6px; }
  .insight-card { padding: 14px 16px; border-radius: var(--radius-md); border-left: 3px solid transparent; font-size: 14px; line-height: 1.6; animation: fadeUp var(--duration-slow) var(--ease-out) both; }
  .insight-success { background: #f0fdf4; border-color: #22c55e; color: #14532d; }
  .insight-warning { background: #fffbeb; border-color: #f59e0b; color: #78350f; }
  .insight-info    { background: #eff6ff; border-color: #3b82f6; color: #1e3a8a; }
  .progress-bar { height: 6px; border-radius: 999px; background: #e5e7eb; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--accent), var(--accent-2)); transition: width 0.6s var(--ease-out); }
  .resource-toggle { width: 100%; padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; background: none; border: none; cursor: pointer; font-family: inherit; font-size: 15px; font-weight: 600; color: var(--ink); transition: background var(--duration-fast) ease; border-radius: var(--radius-lg) var(--radius-lg) 0 0; }
  .resource-toggle:hover { background: var(--surface-2); }
`;

const Learnlytics = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [gradeLevel, setGradeLevel] = useState('');
  const [formData, setFormData] = useState({ study_hours: '', attendance: '', participation: '', subjects: [] });
  const [subjectMetrics, setSubjectMetrics] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedResource, setExpandedResource] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  const gradeOptions = [
    {
      id: 'middle_school', name: 'Middle School', icon: '🎒', description: 'Foundational skills across core subjects',
      tag: 'Grades 6–8', tagColor: '#2563eb', tagBg: '#eff6ff',
      bannerBg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
      floats: ['📐', '🔭'],
    },
    {
      id: 'high_school', name: 'High School', icon: '📚', description: 'Advanced academics & college preparation',
      tag: 'Grades 9–12', tagColor: '#7c3aed', tagBg: '#f5f3ff',
      bannerBg: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
      floats: ['⚗️', '📊'],
    },
    {
      id: 'university', name: 'University (CSE)', icon: '🎓', description: 'CS fundamentals, algorithms & systems',
      tag: 'Computer Science', tagColor: '#0891b2', tagBg: '#ecfeff',
      bannerBg: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)',
      floats: ['💻', '🧠'],
    },
  ];

  const subjectsByGrade = {
    middle_school: ['MS Math', 'MS Science', 'MS Social Studies', 'MS English'],
    high_school: ['HS Algebra II', 'HS Chemistry', 'HS History', 'HS Literature'],
    university: ['CSE Data Structures', 'CSE Algorithms', 'CSE Database Systems']
  };

  const handleGradeSelect = (grade) => {
    setGradeLevel(grade);
    setFormData({ study_hours: '', attendance: '', participation: '', subjects: [] });
    setSubjectMetrics({});
    setCurrentPage('input');
  };

  const handleSubjectToggle = useCallback((subject) => {
    setFormData(prev => {
      const newSubjects = prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject];
      return { ...prev, subjects: newSubjects };
    });
    setSubjectMetrics(prev => {
      if (!formData.subjects.includes(subject)) return { ...prev, [subject]: { mock_test_score: '' } };
      return prev;
    });
  }, [formData.subjects]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubjectMetricChange = useCallback((subject, field, value) => {
    setSubjectMetrics(prev => ({ ...prev, [subject]: { ...(prev[subject] || {}), [field]: value } }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.study_hours || !formData.attendance || !formData.participation) return alert('Please fill in all general metric fields');
    if (formData.subjects.length === 0) return alert('Please select at least one subject');
    for (const subject of formData.subjects) {
      if (!subjectMetrics[subject]?.mock_test_score) return alert(`Please enter mock test score for ${subject}`);
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade_level: gradeLevel,
          general_metrics: {
            study_hours: parseFloat(formData.study_hours),
            attendance: parseFloat(formData.attendance),
            participation: parseFloat(formData.participation)
          },
          subjects: formData.subjects,
          subject_metrics: Object.fromEntries(
            Object.entries(subjectMetrics).map(([s, m]) => [s, { mock_test_score: parseFloat(m.mock_test_score) }])
          )
        })
      });
      const data = await response.json();
      if (response.ok) { setResults(data); setCurrentPage('results'); }
      else alert(data.error || 'Error predicting scores');
    } catch {
      alert('Error connecting to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────── LANDING ─────────────── */
  const LandingPage = () => (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: 860, width: '100%', textAlign: 'center' }}>
        <div className="anim-fade-up" style={{ marginBottom: 32 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <TrendingUp size={32} color="#a5b4fc" />
          </div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', marginBottom: 12 }}>Learnlytics</h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', maxWidth: 480, margin: '0 auto 48px', lineHeight: 1.6 }}>
            AI-powered student performance prediction & personalised improvement
          </p>
        </div>
        <div className="stagger anim-fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            { icon: <BookOpen size={22} />, title: 'Predict Performance', desc: 'Accurate predictions across multiple subjects' },
            { icon: <Award size={22} />, title: 'Identify Weaknesses', desc: 'Discover areas that need improvement' },
            { icon: <TrendingUp size={22} />, title: 'Get Resources', desc: 'Personalised learning recommendations' },
          ].map((f, i) => (
            <div key={i} style={{ '--i': i, padding: '24px 20px', borderRadius: 16, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
              <div style={{ color: '#a5b4fc', marginBottom: 12 }}>{f.icon}</div>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{f.title}</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage('grade')}
          style={{ background: 'var(--accent)', color: '#fff', padding: '14px 36px', borderRadius: 999, border: 'none', fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'Sora, sans-serif', display: 'inline-flex', alignItems: 'center', gap: 8, letterSpacing: '-0.01em', transition: 'opacity 150ms ease, transform 150ms ease' }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          Get started <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );

  /* ─────────────── GRADE SELECTION ─────────────── */
  const GradeSelectionPage = () => (
    <div style={{ minHeight: '100vh', background: 'var(--surface-2)', padding: '0' }}>
      {/* Top bar */}
      <div style={{ padding: '20px 40px', borderBottom: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button className="back-btn" onClick={() => setCurrentPage('landing')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back
        </button>
        <div style={{ width: 1, height: 16, background: 'var(--border)' }} />
        <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Learnlytics</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 4, borderRadius: 999, background: 'var(--accent)' }} />
          <div style={{ width: 8, height: 4, borderRadius: 999, background: 'var(--border)' }} />
          <div style={{ width: 8, height: 4, borderRadius: 999, background: 'var(--border)' }} />
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: '0 auto', padding: '56px 32px' }}>
        {/* Header */}
        <div className="anim-fade-up" style={{ marginBottom: 52, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 999, background: 'var(--accent-3)', color: 'var(--accent)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            Step 1 of 3
          </div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.04em', marginBottom: 14, lineHeight: 1.1 }}>
            Select your<br />education level
          </h1>
          <p style={{ fontSize: 16, color: 'var(--ink-3)', maxWidth: 400, margin: '0 auto', lineHeight: 1.6 }}>
            We'll personalise your performance predictions based on your grade level
          </p>
        </div>

        {/* Cards */}
        <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {gradeOptions.map((opt, i) => (
            <button
              key={opt.id}
              onClick={() => handleGradeSelect(opt.id)}
              className="grade-card anim-fade-up"
              style={{ '--i': i }}
            >
              {/* Banner */}
              <div className="card-banner" style={{ background: opt.bannerBg }}>
                <span style={{ fontSize: 52, zIndex: 1, position: 'relative' }}>{opt.icon}</span>
                <span className="float-icon" style={{ bottom: 8, left: 12, animation: 'floatA 4s ease-in-out infinite' }}>{opt.floats[0]}</span>
                <span className="float-icon" style={{ top: 8, right: 16, animation: 'floatB 3.5s ease-in-out infinite 0.5s' }}>{opt.floats[1]}</span>
              </div>
              {/* Body */}
              <div className="card-body">
                <span className="card-tag" style={{ background: opt.tagBg, color: opt.tagColor }}>{opt.tag}</span>
                <p className="card-title">{opt.name}</p>
                <p className="card-desc">{opt.description}</p>
              </div>
              {/* Arrow */}
              <div className="card-arrow">
                <ArrowRight size={15} />
              </div>
            </button>
          ))}
        </div>

        {/* Bottom caption */}
        <p className="anim-fade-in" style={{ textAlign: 'center', marginTop: 40, fontSize: 13, color: 'var(--ink-4)' }}>
          Your data is used only to generate predictions and is never stored.
        </p>
      </div>
    </div>
  );

  /* ─────────────── INPUT METRICS ─────────────── */
  const selectedGradeOption = gradeOptions.find(g => g.id === gradeLevel);

  const InputMetricsPage = () => (
    <div style={{ minHeight: '100vh', background: 'var(--surface-2)', padding: 0 }}>
      {/* Top bar */}
      <div style={{ padding: '20px 40px', borderBottom: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button className="back-btn" onClick={() => setCurrentPage('grade')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Grade selection
        </button>
        <div style={{ width: 1, height: 16, background: 'var(--border)' }} />
        <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Learnlytics</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 4, borderRadius: 999, background: 'var(--border)' }} />
          <div style={{ width: 24, height: 4, borderRadius: 999, background: 'var(--accent)' }} />
          <div style={{ width: 8, height: 4, borderRadius: 999, background: 'var(--border)' }} />
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 32px' }}>
        {/* Header */}
        <div className="anim-fade-up" style={{ marginBottom: 40 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 999, background: 'var(--accent-3)', color: 'var(--accent)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            Step 2 of 3
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.04em', marginBottom: 8, lineHeight: 1.1 }}>
                Your study metrics
              </h1>
              <p style={{ fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.6 }}>Tell us how you study and which subjects to analyse</p>
            </div>
            {selectedGradeOption && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderRadius: 12, background: selectedGradeOption.tagBg, border: `1.5px solid ${selectedGradeOption.tagColor}22`, flexShrink: 0 }}>
                <span style={{ fontSize: 20 }}>{selectedGradeOption.icon}</span>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: selectedGradeOption.tagColor, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{selectedGradeOption.tag}</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>{selectedGradeOption.name}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section: General metrics */}
        <div className="anim-fade-up" style={{ '--i': 1, marginBottom: 36 }}>
          <div className="section-pill">
            <Clock size={11} /> Study habits
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            {[
              { field: 'study_hours', label: 'Weekly study hours', hint: 'avg 8.5 hrs / week', placeholder: '8.5', icon: '📖', iconBg: '#eff6ff', iconColor: '#2563eb' },
              { field: 'attendance', label: 'Attendance rate', hint: 'avg 85%', placeholder: '85', icon: '✅', iconBg: '#f0fdf4', iconColor: '#16a34a' },
              { field: 'participation', label: 'Class participation', hint: 'score out of 10', placeholder: '7.2', icon: '🙋', iconBg: '#fff7ed', iconColor: '#ea580c' },
            ].map(({ field, label, hint, placeholder, icon, iconBg }) => (
              <div key={field} className="metric-input-card">
                <div className="mcard-icon" style={{ background: iconBg }}>
                  <span style={{ fontSize: 18 }}>{icon}</span>
                </div>
                <p className="mcard-label">{label}</p>
                <p className="mcard-hint">{hint}</p>
                <input
                  className="mcard-inp"
                  value={formData[field]}
                  onChange={e => handleInputChange(field, e.target.value)}
                  placeholder={placeholder}
                  type="number"
                  min="0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section: Subject selection */}
        <div className="anim-fade-up" style={{ '--i': 2, marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div className="section-pill">
              <BookOpen size={11} /> Select subjects
            </div>
            {formData.subjects.length > 0 && (
              <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>
                {formData.subjects.length} selected
              </span>
            )}
          </div>
          <p style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 16 }}>Choose one or more subjects for performance prediction</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
            {subjectsByGrade[gradeLevel]?.map((subject, i) => {
              const isActive = formData.subjects.includes(subject);
              return (
                <button
                  key={subject}
                  type="button"
                  onClick={() => handleSubjectToggle(subject)}
                  className={`subject-chip${isActive ? ' active' : ''}`}
                >
                  <span className="chip-check">
                    {isActive && <Check size={11} strokeWidth={3} />}
                  </span>
                  {subject}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section: Mock test scores */}
        {formData.subjects.length > 0 && (
          <div className="anim-slide-down" style={{ marginBottom: 36 }}>
            <div className="section-pill">
              <Target size={11} /> Mock test scores
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 16 }}>Enter your most recent score for each subject (0–100)</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {formData.subjects.map((subject, i) => (
                <div key={subject} className="score-input-row anim-fade-up" style={{ '--i': i }}>
                  <div className="score-label">
                    <span className="score-dot" />
                    <span className="score-name">{subject}</span>
                  </div>
                  <input
                    className="score-inp"
                    value={subjectMetrics[subject]?.mock_test_score || ''}
                    onChange={e => handleSubjectMetricChange(subject, 'mock_test_score', e.target.value)}
                    placeholder="—"
                    type="number"
                    min="0"
                    max="100"
                  />
                  <span className="score-unit">/ 100</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="anim-fade-up" style={{ '--i': 4 }}>
          <button onClick={handleSubmit} disabled={loading} className="submit-btn">
            {loading ? (
              <><span className="spinner" /> Analysing performance…</>
            ) : (
              <>Predict my performance <ArrowRight size={16} /></>
            )}
          </button>
          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--ink-4)', marginTop: 12 }}>
            Predictions are generated using your inputs and class-level benchmarks
          </p>
        </div>
      </div>
    </div>
  );

  /* ─────────────── RESULTS ─────────────── */
  const ResultsPage = () => {
    if (!results) return null;

    const chartData = Object.entries(results.predictions).map(([subject, data]) => ({
      subject: subject.replace(/^(MS|HS|CSE)\s/, ''),
      score: data.score,
      average: data.mean
    }));

    const radarData = Object.entries(results.predictions).map(([subject, data]) => ({
      subject: subject.replace(/^(MS|HS|CSE)\s/, '').substring(0, 10),
      score: data.score,
      fullMark: 100
    }));

    const tickStyle = { fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 12, fill: '#7b7b8f' };

    return (
      <div style={{ minHeight: '100vh', background: 'var(--surface-2)', padding: '2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <button className="back-btn anim-fade-in" style={{ marginBottom: 20 }} onClick={() => { setCurrentPage('input'); setResults(null); }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            New prediction
          </button>

          <div className="card anim-fade-up" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 26, fontWeight: 800, color: 'var(--ink)', marginBottom: 28, letterSpacing: '-0.03em' }}>Performance analysis</h2>

            <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 36 }}>
              <div className="metric-card anim-fade-up" style={{ '--i': 0, background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#3730a3' }}>Overall average</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 36, fontWeight: 800, color: '#1e40af', lineHeight: 1.1 }}>{results.overall_average}%</p>
              </div>
              <div className="metric-card anim-fade-up" style={{ '--i': 1, background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#166534' }}>Strong subjects</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 36, fontWeight: 800, color: '#15803d', lineHeight: 1.1 }}>{results.strong_subjects.length}</p>
              </div>
              <div className="metric-card anim-fade-up" style={{ '--i': 2, background: '#fff7ed', border: '1px solid #fed7aa' }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#9a3412' }}>Needs focus</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 36, fontWeight: 800, color: '#c2410c', lineHeight: 1.1 }}>{results.weak_subjects.length}</p>
              </div>
            </div>

            {results.insights?.length > 0 && (
              <div style={{ marginBottom: 36 }}>
                <p style={{ fontWeight: 600, fontSize: 15, color: 'var(--ink)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 7 }}>
                  <Lightbulb size={18} color="#f59e0b" /> Personalised insights
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {results.insights.map((insight, i) => (
                    <div key={i} className={`insight-card insight-${insight.type || 'info'}`} style={{ '--i': i }}>{insight.message}</div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, marginBottom: 36 }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: 15, color: 'var(--ink)', marginBottom: 16 }}>Score comparison</p>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={chartData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="subject" angle={-35} textAnchor="end" height={80} tick={tickStyle} />
                    <YAxis domain={[0, 100]} tick={tickStyle} />
                    <Tooltip contentStyle={{ fontFamily: 'DM Sans', fontSize: 13, borderRadius: 10, border: '1px solid var(--border)' }} />
                    <Legend wrapperStyle={{ fontFamily: 'DM Sans', fontSize: 13 }} />
                    <Bar dataKey="score" fill="var(--accent)" name="Your score" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="average" fill="#c7d2fe" name="Class average" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 15, color: 'var(--ink)', marginBottom: 16 }}>Performance overview</p>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={tickStyle} />
                    <PolarRadiusAxis domain={[0, 100]} tick={tickStyle} />
                    <Radar name="Your score" dataKey="score" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.2} />
                    <Tooltip contentStyle={{ fontFamily: 'DM Sans', fontSize: 13, borderRadius: 10 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ marginBottom: 36 }}>
              <p style={{ fontWeight: 600, fontSize: 15, color: 'var(--ink)', marginBottom: 14 }}>Detailed subject analysis</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                {Object.entries(results.predictions).map(([subject, data], i) => {
                  const isStrong = data.status === 'strong';
                  return (
                    <div key={subject} className="anim-fade-up" style={{ '--i': i, padding: '1.25rem', borderRadius: 14, background: isStrong ? '#f0fdf4' : '#fff7ed', border: `1px solid ${isStrong ? '#bbf7d0' : '#fed7aa'}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                        <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>{subject}</p>
                        <span className={`badge badge-${isStrong ? 'green' : 'red'}`}>{data.grade}</span>
                      </div>
                      <div style={{ marginBottom: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-3)', marginBottom: 5 }}>
                          <span>Your score</span><span style={{ fontWeight: 600, color: 'var(--ink)' }}>{data.score}%</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${data.score}%` }} />
                        </div>
                      </div>
                      <p style={{ fontSize: 12, color: 'var(--ink-3)' }}>
                        Class avg: <strong>{data.mean}%</strong>
                        <span style={{ marginLeft: 8, fontWeight: 600, color: data.diff_from_mean >= 0 ? '#16a34a' : '#dc2626' }}>
                          {data.diff_from_mean >= 0 ? '+' : ''}{data.diff_from_mean}%
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {results.weak_subjects.length > 0 && (
              <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 14, padding: '1.5rem', marginBottom: 36 }}>
                <p style={{ fontWeight: 600, fontSize: 15, color: '#9a3412', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
                  <AlertCircle size={18} /> Subjects requiring attention
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {results.weak_subjects.map(subject => (
                    <div key={subject.name} style={{ background: '#fff', borderRadius: 10, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #fde8c8' }}>
                      <span style={{ fontWeight: 500, fontSize: 14, color: 'var(--ink)' }}>{subject.name}</span>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontWeight: 700, fontSize: 15, color: '#c2410c' }}>{subject.score}%</p>
                        <p style={{ fontSize: 11, color: 'var(--ink-4)' }}>{Math.abs(subject.diff)}% below average</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {Object.keys(results.resources || {}).length > 0 && (
              <div>
                <p style={{ fontWeight: 600, fontSize: 15, color: 'var(--ink)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 7 }}>
                  <BookOpen size={18} color="var(--accent)" /> Recommended learning resources
                </p>
                <p style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 18 }}>Curated resources to help you improve in weaker areas</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {Object.entries(results.resources).map(([subject, resources]) => (
                    <div key={subject} style={{ border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', background: '#fff' }}>
                      <button className="resource-toggle" onClick={() => setExpandedResource(expandedResource === subject ? null : subject)}>
                        {subject}
                        {expandedResource === subject ? <ChevronUp size={16} color="var(--accent)" /> : <ChevronDown size={16} color="var(--ink-4)" />}
                      </button>
                      {expandedResource === subject && (
                        <div className="anim-slide-down" style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid var(--border)' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 20, paddingTop: 16 }}>
                            {[
                              { label: 'Videos', key: 'videos', emoji: '▶' },
                              { label: 'Practice', key: 'practice', emoji: '✏' },
                              { label: 'Books', key: 'books', emoji: '📖' },
                              { label: 'Tips', key: 'tips', emoji: '💡' },
                            ].map(({ label, key, emoji }) => (
                              <div key={key}>
                                <p style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink-2)', marginBottom: 8 }}>{emoji} {label}</p>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
                                  {resources[key]?.map((item, i) => (
                                    <li key={i} style={{ fontSize: 13, color: 'var(--ink-3)', paddingLeft: 10, borderLeft: '2px solid var(--accent-3)', lineHeight: 1.4 }}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div>
        {currentPage === 'landing' && <LandingPage />}
        {currentPage === 'grade' && <GradeSelectionPage />}
        {currentPage === 'input' && <InputMetricsPage />}
        {currentPage === 'results' && <ResultsPage />}
      </div>
    </>
  );
};

export default Learnlytics;