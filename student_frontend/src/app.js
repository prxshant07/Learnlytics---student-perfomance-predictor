import React, { useState, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { BookOpen, TrendingUp, Award, AlertCircle, ArrowRight, Check, Clock, Users, Target, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

/* ─── animation keyframes injected once ─── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

  :root {
    --duration-fast:   120ms;
    --duration-base:   220ms;
    --duration-slow:   380ms;
    --ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-out:        cubic-bezier(0.22, 1, 0.36, 1);
    --ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);
    --radius-sm:       6px;
    --radius-md:       10px;
    --radius-lg:       16px;
    --radius-xl:       24px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :focus-visible {
    outline: 2px solid #6366f1;
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
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.94); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    from { background-position:  200% 0; }
    to   { background-position: -200% 0; }
  }

  .anim-fade-up   { animation: fadeUp   var(--duration-slow) var(--ease-out) both; }
  .anim-fade-in   { animation: fadeIn   var(--duration-base) ease both; }
  .anim-scale-in  { animation: scaleIn  var(--duration-slow) var(--ease-spring) both; }
  .anim-slide-down{ animation: slideDown var(--duration-base) var(--ease-out) both; }

  .stagger-children > * { animation-delay: calc(var(--i, 0) * 70ms); }

  .hover-lift {
    transition: transform var(--duration-base) var(--ease-spring),
                box-shadow var(--duration-base) ease;
  }
  .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.10); }
  .hover-lift:active{ transform: scale(0.97); }

  .btn-press:active { transform: scale(0.97); }

  .inp-base {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid #e5e7eb;
    border-radius: var(--radius-md);
    font-size: 14px;
    font-family: inherit;
    color: #111827;
    background: #fff;
    transition: border-color var(--duration-fast) ease,
                box-shadow  var(--duration-fast) ease;
    outline: none;
  }
  .inp-base::placeholder { color: #9ca3af; }
  .inp-base:hover  { border-color: #a5b4fc; }
  .inp-base:focus  { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }

  .badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.03em;
  }
  .badge-green  { background: #dcfce7; color: #166534; }
  .badge-red    { background: #fee2e2; color: #991b1b; }
  .badge-indigo { background: #e0e7ff; color: #3730a3; }

  .card {
    background: #ffffff;
    border: 1px solid #f1f5f9;
    border-radius: var(--radius-xl);
    box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.04);
  }

  .metric-card {
    border-radius: var(--radius-lg);
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .subject-btn {
    padding: 12px 16px;
    border-radius: var(--radius-md);
    border: 1.5px solid #e5e7eb;
    background: #fff;
    color: #374151;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: border-color var(--duration-fast) ease,
                background   var(--duration-fast) ease,
                color        var(--duration-fast) ease,
                transform    var(--duration-fast) var(--ease-spring);
  }
  .subject-btn:hover   { border-color: #a5b4fc; background: #f5f3ff; }
  .subject-btn.active  { border-color: #6366f1; background: #6366f1; color: #fff; }
  .subject-btn:active  { transform: scale(0.98); }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 500;
    color: #6366f1;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px 0;
    font-family: inherit;
    transition: color var(--duration-fast) ease;
  }
  .back-btn:hover { color: #4338ca; }

  .resource-toggle {
    width: 100%;
    padding: 1rem 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 15px;
    font-weight: 600;
    color: #1e1b4b;
    transition: background var(--duration-fast) ease;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }
  .resource-toggle:hover { background: rgba(99,102,241,0.06); }

  .spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
    display: inline-block;
    vertical-align: middle;
    margin-right: 8px;
  }

  .progress-bar {
    height: 6px;
    border-radius: 999px;
    background: #e5e7eb;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, #6366f1, #818cf8);
    transition: width 0.6s var(--ease-out);
  }

  .insight-card {
    padding: 14px 16px;
    border-radius: var(--radius-md);
    border-left: 3px solid transparent;
    font-size: 14px;
    line-height: 1.6;
    animation: fadeUp var(--duration-slow) var(--ease-out) both;
  }
  .insight-success { background: #f0fdf4; border-color: #22c55e; color: #14532d; }
  .insight-warning { background: #fffbeb; border-color: #f59e0b; color: #78350f; }
  .insight-info    { background: #eff6ff; border-color: #3b82f6; color: #1e3a8a; }
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
    { id: 'middle_school', name: 'Middle School', icon: '🎒', description: 'Grades 6–8' },
    { id: 'high_school',   name: 'High School',   icon: '📚', description: 'Grades 9–12' },
    { id: 'university',    name: 'University (CSE)', icon: '🎓', description: 'Computer Science' }
  ];

  const subjectsByGrade = {
    middle_school: ['MS Math', 'MS Science', 'MS Social Studies', 'MS English'],
    high_school:   ['HS Algebra II', 'HS Chemistry', 'HS History', 'HS Literature'],
    university:    ['CSE Data Structures', 'CSE Algorithms', 'CSE Database Systems']
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
            study_hours:   parseFloat(formData.study_hours),
            attendance:    parseFloat(formData.attendance),
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

  /* ─── LANDING ─── */
  const LandingPage = () => (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: 860, width: '100%', textAlign: 'center' }}>
        <div className="anim-fade-up" style={{ marginBottom: 32 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <TrendingUp size={32} color="#a5b4fc" />
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', marginBottom: 12 }}>Learnlytics</h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', maxWidth: 480, margin: '0 auto 48px' }}>
            AI-powered student performance prediction & personalised improvement
          </p>
        </div>

        <div className="stagger-children anim-fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            { icon: <BookOpen size={22} />, title: 'Predict Performance', desc: 'Accurate predictions across multiple subjects' },
            { icon: <Award size={22} />,    title: 'Identify Weaknesses',  desc: 'Discover areas that need improvement' },
            { icon: <TrendingUp size={22} />, title: 'Get Resources',      desc: 'Personalised learning recommendations' },
          ].map((f, i) => (
            <div key={i} style={{ '--i': i, padding: '24px 20px', borderRadius: 16, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', textAlign: 'center' }}>
              <div style={{ color: '#a5b4fc', marginBottom: 12 }}>{f.icon}</div>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{f.title}</p>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage('grade')}
          className="btn-press hover-lift"
          style={{ background: '#6366f1', color: '#fff', padding: '14px 36px', borderRadius: 999, border: 'none', fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          Get started <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );

  /* ─── GRADE SELECTION ─── */
  const GradeSelectionPage = () => (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <button className="back-btn anim-fade-in" onClick={() => setCurrentPage('landing')}>← Back</button>
        <div className="card anim-fade-up" style={{ padding: '2.5rem', marginTop: 16 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>Select your education level</h2>
          <p style={{ color: '#64748b', fontSize: 15, marginBottom: 32 }}>Choose your grade to get personalised predictions</p>
          <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
            {gradeOptions.map((opt, i) => (
              <button
                key={opt.id}
                onClick={() => handleGradeSelect(opt.id)}
                className="anim-scale-in hover-lift btn-press"
                style={{ '--i': i, padding: '28px 20px', borderRadius: 16, background: '#fff', border: '1.5px solid #e2e8f0', cursor: 'pointer', textAlign: 'center', fontFamily: 'inherit', transition: 'border-color 120ms ease, background 120ms ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.background = '#fafafa'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fff'; }}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>{opt.icon}</div>
                <p style={{ fontWeight: 700, fontSize: 16, color: '#0f172a', marginBottom: 4 }}>{opt.name}</p>
                <p style={{ fontSize: 13, color: '#94a3b8' }}>{opt.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  /* ─── INPUT METRICS ─── */
  const InputMetricsPage = () => (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <button className="back-btn anim-fade-in" onClick={() => setCurrentPage('grade')}>← Back to grade selection</button>
        <div className="card anim-fade-up" style={{ padding: '2.5rem', marginTop: 16 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Input your metrics</h2>
          <p style={{ color: '#64748b', fontSize: 15, marginBottom: 32 }}>Tell us about your study habits and select subjects for prediction</p>

          {/* General Metrics */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.5rem', marginBottom: 28 }}>
            <p style={{ fontWeight: 600, fontSize: 15, color: '#0f172a', marginBottom: 18 }}>General metrics</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18 }}>
              {[
                { field: 'study_hours',   label: 'Weekly study hours',    icon: <Clock size={15} />,  placeholder: 'e.g. 8.5', hint: 'Average: 8.5 hrs/week' },
                { field: 'attendance',    label: 'Attendance (%)',         icon: <Users size={15} />,  placeholder: 'e.g. 85',  hint: 'Average: 85%' },
                { field: 'participation', label: 'Class participation (0–10)', icon: <Target size={15} />, placeholder: 'e.g. 7.2', hint: 'Average: 7.2 / 10' },
              ].map(({ field, label, icon, placeholder, hint }) => (
                <div key={field}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 7 }}>
                    <span style={{ color: '#6366f1' }}>{icon}</span> {label}
                  </label>
                  <input
                    className="inp-base"
                    value={formData[field]}
                    onChange={e => handleInputChange(field, e.target.value)}
                    placeholder={placeholder}
                    type="number"
                    min="0"
                  />
                  <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 5 }}>{hint}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subject selection */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 12 }}>Select subjects for prediction</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
              {subjectsByGrade[gradeLevel]?.map(subject => (
                <button
                  key={subject}
                  type="button"
                  onClick={() => handleSubjectToggle(subject)}
                  className={`subject-btn${formData.subjects.includes(subject) ? ' active' : ''}`}
                >
                  {formData.subjects.includes(subject) && <Check size={14} />}
                  {subject}
                </button>
              ))}
            </div>
          </div>

          {/* Subject-specific scores */}
          {formData.subjects.length > 0 && (
            <div className="anim-slide-down" style={{ borderTop: '1px solid #f1f5f9', paddingTop: 24, marginBottom: 28 }}>
              <p style={{ fontWeight: 600, fontSize: 15, color: '#0f172a', marginBottom: 4 }}>Subject-specific metrics</p>
              <p style={{ fontSize: 13, color: '#64748b', marginBottom: 18 }}>Enter mock test scores for more accurate predictions</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {formData.subjects.map((subject, i) => (
                  <div key={subject} className="anim-fade-up" style={{ '--i': i, background: '#fafafa', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                    <p style={{ fontWeight: 600, fontSize: 14, color: '#1e1b4b', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 7 }}>
                      <BookOpen size={15} color="#6366f1" /> {subject}
                    </p>
                    <div style={{ maxWidth: 320 }}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 7 }}>Mock test score (0–100) *</label>
                      <input
                        className="inp-base"
                        value={subjectMetrics[subject]?.mock_test_score || ''}
                        onChange={e => handleSubjectMetricChange(subject, 'mock_test_score', e.target.value)}
                        placeholder="e.g. 75"
                        type="number"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-press"
            style={{ width: '100%', background: loading ? '#c7d2fe' : '#6366f1', color: '#fff', padding: '14px', borderRadius: 12, border: 'none', fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background 200ms ease' }}
          >
            {loading && <span className="spinner" />}
            {loading ? 'Analysing performance…' : 'Predict performance'}
          </button>
        </div>
      </div>
    </div>
  );

  /* ─── RESULTS ─── */
  const ResultsPage = () => {
    if (!results) return null;

    const chartData = Object.entries(results.predictions).map(([subject, data]) => ({
      subject: subject.replace(/^(MS|HS|CSE)\s/, ''),
      score:   data.score,
      average: data.mean
    }));

    const radarData = Object.entries(results.predictions).map(([subject, data]) => ({
      subject:  subject.replace(/^(MS|HS|CSE)\s/, '').substring(0, 10),
      score:    data.score,
      fullMark: 100
    }));

    const tickStyle = { fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif', fontSize: 12, fill: '#64748b' };

    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <button className="back-btn anim-fade-in" onClick={() => { setCurrentPage('input'); setResults(null); }}>← New prediction</button>

          <div className="card anim-fade-up" style={{ padding: '2.5rem', marginTop: 16 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: '#0f172a', marginBottom: 28 }}>Performance analysis</h2>

            {/* Summary metric cards */}
            <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 36 }}>
              <div className="metric-card anim-fade-up" style={{ '--i': 0, background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#3730a3' }}>Overall average</p>
                <p style={{ fontSize: 36, fontWeight: 700, color: '#1e40af', lineHeight: 1.1 }}>{results.overall_average}%</p>
              </div>
              <div className="metric-card anim-fade-up" style={{ '--i': 1, background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#166534' }}>Strong subjects</p>
                <p style={{ fontSize: 36, fontWeight: 700, color: '#15803d', lineHeight: 1.1 }}>{results.strong_subjects.length}</p>
              </div>
              <div className="metric-card anim-fade-up" style={{ '--i': 2, background: '#fff7ed', border: '1px solid #fed7aa' }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#9a3412' }}>Needs focus</p>
                <p style={{ fontSize: 36, fontWeight: 700, color: '#c2410c', lineHeight: 1.1 }}>{results.weak_subjects.length}</p>
              </div>
            </div>

            {/* Insights */}
            {results.insights?.length > 0 && (
              <div style={{ marginBottom: 36 }}>
                <p style={{ fontWeight: 600, fontSize: 15, color: '#0f172a', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 7 }}>
                  <Lightbulb size={18} color="#f59e0b" /> Personalised insights
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {results.insights.map((insight, i) => (
                    <div key={i} className={`insight-card insight-${insight.type || 'info'}`} style={{ '--i': i }}>
                      {insight.message}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, marginBottom: 36 }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: 15, color: '#0f172a', marginBottom: 16 }}>Score comparison</p>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={chartData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="subject" angle={-35} textAnchor="end" height={80} tick={tickStyle} />
                    <YAxis domain={[0, 100]} tick={tickStyle} />
                    <Tooltip contentStyle={{ fontFamily: 'Plus Jakarta Sans', fontSize: 13, borderRadius: 8, border: '1px solid #e2e8f0' }} />
                    <Legend wrapperStyle={{ fontFamily: 'Plus Jakarta Sans', fontSize: 13 }} />
                    <Bar dataKey="score"   fill="#6366f1" name="Your score"    radius={[4,4,0,0]} />
                    <Bar dataKey="average" fill="#c7d2fe" name="Class average" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 15, color: '#0f172a', marginBottom: 16 }}>Performance overview</p>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={tickStyle} />
                    <PolarRadiusAxis domain={[0,100]} tick={tickStyle} />
                    <Radar name="Your score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} />
                    <Tooltip contentStyle={{ fontFamily: 'Plus Jakarta Sans', fontSize: 13, borderRadius: 8 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Subject cards */}
            <div style={{ marginBottom: 36 }}>
              <p style={{ fontWeight: 600, fontSize: 15, color: '#0f172a', marginBottom: 14 }}>Detailed subject analysis</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                {Object.entries(results.predictions).map(([subject, data], i) => {
                  const isStrong = data.status === 'strong';
                  return (
                    <div key={subject} className="anim-fade-up" style={{ '--i': i, padding: '1.25rem', borderRadius: 12, background: isStrong ? '#f0fdf4' : '#fff7ed', border: `1px solid ${isStrong ? '#bbf7d0' : '#fed7aa'}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                        <p style={{ fontWeight: 600, fontSize: 14, color: '#0f172a' }}>{subject}</p>
                        <span className={`badge badge-${isStrong ? 'green' : 'red'}`}>{data.grade}</span>
                      </div>
                      <div style={{ marginBottom: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', marginBottom: 5 }}>
                          <span>Your score</span><span style={{ fontWeight: 600, color: '#0f172a' }}>{data.score}%</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${data.score}%` }} />
                        </div>
                      </div>
                      <p style={{ fontSize: 12, color: '#64748b' }}>
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

            {/* Weak subjects panel */}
            {results.weak_subjects.length > 0 && (
              <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 14, padding: '1.5rem', marginBottom: 36 }}>
                <p style={{ fontWeight: 600, fontSize: 15, color: '#9a3412', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
                  <AlertCircle size={18} /> Subjects requiring attention
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {results.weak_subjects.map(subject => (
                    <div key={subject.name} style={{ background: '#fff', borderRadius: 10, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #fde8c8' }}>
                      <span style={{ fontWeight: 500, fontSize: 14, color: '#0f172a' }}>{subject.name}</span>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontWeight: 700, fontSize: 15, color: '#c2410c' }}>{subject.score}%</p>
                        <p style={{ fontSize: 11, color: '#9ca3af' }}>{Math.abs(subject.diff)}% below average</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resources */}
            {Object.keys(results.resources || {}).length > 0 && (
              <div>
                <p style={{ fontWeight: 600, fontSize: 15, color: '#0f172a', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 7 }}>
                  <BookOpen size={18} color="#6366f1" /> Recommended learning resources
                </p>
                <p style={{ fontSize: 13, color: '#64748b', marginBottom: 18 }}>Curated resources to help you improve in weaker areas</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {Object.entries(results.resources).map(([subject, resources]) => (
                    <div key={subject} style={{ border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', background: '#fff' }}>
                      <button className="resource-toggle" onClick={() => setExpandedResource(expandedResource === subject ? null : subject)}>
                        {subject}
                        {expandedResource === subject ? <ChevronUp size={16} color="#6366f1" /> : <ChevronDown size={16} color="#94a3b8" />}
                      </button>
                      {expandedResource === subject && (
                        <div className="anim-slide-down" style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid #f1f5f9' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 20, paddingTop: 16 }}>
                            {[
                              { label: 'Videos',   key: 'videos',   emoji: '▶' },
                              { label: 'Practice', key: 'practice', emoji: '✏' },
                              { label: 'Books',    key: 'books',    emoji: '📖' },
                              { label: 'Tips',     key: 'tips',     emoji: '💡' },
                            ].map(({ label, key, emoji }) => (
                              <div key={key}>
                                <p style={{ fontWeight: 600, fontSize: 13, color: '#374151', marginBottom: 8 }}>{emoji} {label}</p>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
                                  {resources[key]?.map((item, i) => (
                                    <li key={i} style={{ fontSize: 13, color: '#64748b', paddingLeft: 10, borderLeft: '2px solid #e0e7ff', lineHeight: 1.4 }}>{item}</li>
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
        {currentPage === 'landing'  && <LandingPage />}
        {currentPage === 'grade'    && <GradeSelectionPage />}
        {currentPage === 'input'    && <InputMetricsPage />}
        {currentPage === 'results'  && <ResultsPage />}
      </div>
    </>
  );
};

export default Learnlytics;