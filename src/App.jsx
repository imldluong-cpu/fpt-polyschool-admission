import { useState, useRef } from 'react';
import { Search, ChevronRight, CheckCircle, GraduationCap, Briefcase, Palette, Code, MapPin, Award, BookOpen, Clock, Megaphone, MonitorSmartphone } from 'lucide-react';
import './App.css';
import { highSchools, quizQuestions, resultMapping } from './data';

function App() {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [myScore, setMyScore] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState(null);

  const introRef = useRef(null);
  const quizRef = useRef(null);

  const schoolData = highSchools.find(s => s.id === Number(selectedSchool));

  const handleLookup = (e) => {
    e.preventDefault();
    if (selectedSchool && myScore) {
      setShowModal(true);
    }
  };

  const scrollToSection = (ref) => {
    setShowModal(false);
    setShowIntro(true);
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleQuizSelect = (type) => {
    const newAnswers = [...quizAnswers, type];
    setQuizAnswers(newAnswers);

    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(curr => curr + 1);
    } else {
      // Calculate result
      const counts = newAnswers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {});
      
      let maxType = newAnswers[0];
      let maxCount = 0;
      for (const type in counts) {
        if (counts[type] > maxCount) {
          maxCount = counts[type];
          maxType = type;
        }
      }
      setQuizResult(resultMapping[maxType]);
    }
  };

  return (
    <div className="app-container">
      {/* Hero Section */}
      <header className="hero">
        <h1><span>FPT PolySchool Cần Thơ</span><br/>Tra cứu điểm & Tư vấn tuyển sinh</h1>
        <p>Hành trang vững bước tương lai. Tra cứu điểm chuẩn lớp 10 năm 2025 và dự báo điểm chuẩn 2026 ngay hôm nay.</p>
      </header>

      {/* Lookup Section */}
      <section className="section-container">
        <div className="card">
          <form onSubmit={handleLookup}>
            <div className="form-group">
              <label>Chọn trường THPT bạn quan tâm (Năm 2025)</label>
              <select 
                className="form-control"
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                required
              >
                <option value="">-- Lựa chọn trường --</option>
                {highSchools.map(school => (
                  <option key={school.id} value={school.id}>{school.name}</option>
                ))}
              </select>
            </div>

            {schoolData && (
              <div className="result-box">
                <p>Điểm chuẩn 2025 (NV2a/NV1):</p>
                <div className="score-display">{schoolData.score.toFixed(2)}</div>
              </div>
            )}

            <div className="form-group" style={{ marginTop: '24px' }}>
              <label>Nhập điểm thi thực tế của bạn</label>
              <input 
                type="number" 
                step="0.01"
                className="form-control" 
                placeholder="Ví dụ: 18.5"
                value={myScore}
                onChange={(e) => setMyScore(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn">
              <Search size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }}/>
              Đối chiếu điểm thi
            </button>
          </form>
        </div>
      </section>

      {/* Prediction Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Dự báo điểm chuẩn 2026</h2>
            <p>
              Với tình hình hiện tại, dự kiến điểm chuẩn năm 2026 của <strong>{schoolData?.name}</strong> sẽ tăng khoảng <span className="prediction-highlight">2 - 3 điểm</span>.
            </p>
            <div className="result-box" style={{ margin: '20px 0', textAlign: 'center', borderRadius: '8px' }}>
              <p>Điểm dự kiến 2026 (tham khảo):</p>
              <div className="score-display" style={{ fontSize: '2rem' }}>
                {(schoolData?.score + 2).toFixed(2)} - {(schoolData?.score + 3).toFixed(2)}
              </div>
            </div>
            
            <p style={{ marginTop: '20px', fontWeight: 'bold' }}>Phụ huynh đã tìm thêm môi trường khác cho bạn chưa?</p>
            
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => scrollToSection(introRef)}>
                Đã tìm
              </button>
              <button className="btn" onClick={() => scrollToSection(introRef)}>
                Chưa tìm, cần tư vấn thêm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Intro Section */}
        <section className="intro-section" ref={introRef}>
          <div className="card" style={{ maxWidth: '1000px', backgroundColor: 'transparent', boxShadow: 'none', border: 'none' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '8px', textTransform: 'uppercase' }}>
              Khởi đầu mới tại FPT PolySchool Cần Thơ
            </h2>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '30px' }}>
              HỌC NHANH - LÀM SỚM
            </p>
            
            <div className="intro-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              
              {/* Box 1: Nổi bật */}
              <div className="feature-card" style={{ borderTop: '4px solid #f26522', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: '#0033a0', marginBottom: '20px', fontSize: '1.3rem', borderBottom: '2px solid #eaeaea', paddingBottom: '10px' }}>⭐ NỔI BẬT</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                  <li style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', fontSize: '1.2rem' }}>
                    <CheckCircle size={32} color="#f26522" style={{ marginRight: '16px', minWidth: '32px' }} />
                    <span><strong>Xét học bạ lớp 9</strong></span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem' }}>
                    <GraduationCap size={32} color="#0033a0" style={{ marginRight: '16px', minWidth: '32px' }} />
                    <span><strong>Học 3 năm</strong><br/>nhận bằng Cao đẳng chính quy</span>
                  </li>
                </ul>
              </div>

              {/* Box 2: 3 Chuyên ngành hot */}
              <div className="feature-card" style={{ borderTop: '4px solid #0033a0', textAlign: 'left' }}>
                <h3 style={{ color: '#f26522', marginBottom: '20px', fontSize: '1.3rem', borderBottom: '2px solid #eaeaea', paddingBottom: '10px' }}>🔥 3 CHUYÊN NGÀNH HOT</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                    <Palette size={24} color="#0033a0" style={{ marginRight: '12px', minWidth: '24px' }} />
                    <span>1. <strong>Thiết kế đồ họa</strong></span>
                  </li>
                  <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                    <Megaphone size={24} color="#f26522" style={{ marginRight: '12px', minWidth: '24px' }} />
                    <span>2. <strong>Digital Marketing</strong></span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center' }}>
                    <MonitorSmartphone size={24} color="#0033a0" style={{ marginRight: '12px', minWidth: '24px' }} />
                    <span>3. <strong>Ứng dụng phần mềm</strong></span>
                  </li>
                </ul>
              </div>

              {/* Box 3: Lộ trình học tập */}
              <div className="feature-card" style={{ borderTop: '4px solid #f26522', textAlign: 'left' }}>
                <h3 style={{ color: '#0033a0', marginBottom: '20px', fontSize: '1.3rem', borderBottom: '2px solid #eaeaea', paddingBottom: '10px' }}>📖 LỘ TRÌNH HỌC TẬP</h3>
                <div style={{ borderLeft: '3px solid #eaeaea', paddingLeft: '20px', marginLeft: '10px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-9px', top: '2px', width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#f26522' }}></div>
                  <div style={{ marginBottom: '20px' }}>
                    <strong style={{ color: '#f26522' }}>Năm 1</strong>
                    <p style={{ margin: '5px 0 0 0' }}>Văn hóa phổ thông</p>
                  </div>

                  <div style={{ position: 'absolute', left: '-9px', top: '75px', width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#0033a0' }}></div>
                  <div style={{ marginBottom: '20px' }}>
                    <strong style={{ color: '#0033a0' }}>Năm 2</strong>
                    <p style={{ margin: '5px 0 0 0' }}>Chuyên ngành giai đoạn trung cấp</p>
                  </div>

                  <div style={{ position: 'absolute', left: '-9px', top: '150px', width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#f26522' }}></div>
                  <div>
                    <strong style={{ color: '#f26522' }}>Năm 3</strong>
                    <p style={{ margin: '5px 0 0 0' }}>Chuyên ngành giai đoạn cao đẳng</p>
                  </div>
                </div>
              </div>

              {/* Box 4: Học bổng */}
              <div className="feature-card" style={{ borderTop: '4px solid #f26522', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff3ec' }}>
                <Award size={64} color="#f26522" style={{ marginBottom: '16px' }} />
                <h3 style={{ color: '#0033a0', fontSize: '1.5rem', marginBottom: '8px' }}>HỌC BỔNG</h3>
                <p style={{ fontSize: '2.5rem', fontWeight: '900', color: '#f26522', margin: 0, lineHeight: '1.1' }}>LÊN ĐẾN 50%</p>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginTop: '12px' }}>dành cho học sinh giỏi</p>
              </div>

            </div>

            <div style={{ marginTop: '60px' }}>
              <button className="btn" style={{ maxWidth: '300px' }} onClick={() => quizRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                Tìm hiểu chuyên ngành phù hợp <ChevronRight size={20} style={{ display: 'inline', verticalAlign: 'middle' }}/>
              </button>
            </div>
          </div>
        </section>

      {/* Quiz Section */}
        <section className="quiz-section" ref={quizRef}>
          <div className="card quiz-card">
            {!quizResult ? (
              <>
                <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Khám phá bản thân</h2>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${((currentQuiz) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>
                
                <h3 style={{ marginBottom: '24px', fontSize: '1.3rem' }}>
                  Câu {currentQuiz + 1}: {quizQuestions[currentQuiz].question}
                </h3>
                
                <div className="quiz-options">
                  {quizQuestions[currentQuiz].options.map((opt, index) => (
                    <button 
                      key={index} 
                      className="quiz-option"
                      onClick={() => handleQuizSelect(opt.type)}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="quiz-result">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                  {quizResult.name === 'Thiết kế đồ họa' && <Palette size={64} color="var(--primary-color)" />}
                  {quizResult.name === 'Ứng dụng phần mềm' && <MonitorSmartphone size={64} color="var(--primary-color)" />}
                  {quizResult.name === 'Digital Marketing' && <Megaphone size={64} color="var(--primary-color)" />}
                </div>
                <h3>{quizResult.name}</h3>
                <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>{quizResult.description}</p>
                <button className="btn" onClick={() => window.open('https://zalo.me/0974680024', '_blank')}>
                  Đăng ký tư vấn ngay
                </button>
                <button 
                  className="btn btn-outline" 
                  style={{ marginTop: '16px', display: 'block', width: '100%' }}
                  onClick={() => {
                    setCurrentQuiz(0);
                    setQuizAnswers([]);
                    setQuizResult(null);
                  }}
                >
                  Làm lại bài trắc nghiệm
                </button>
              </div>
            )}
          </div>
        </section>
    </div>
  );
}

export default App;
