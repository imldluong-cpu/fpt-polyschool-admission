import { useState, useRef } from 'react';
import { Search, ChevronRight, CheckCircle, GraduationCap, Briefcase, Palette, Code, MapPin } from 'lucide-react';
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
      {showIntro && (
        <section className="intro-section" ref={introRef}>
          <div className="card" style={{ maxWidth: '900px', backgroundColor: 'transparent', boxShadow: 'none', border: 'none' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '16px' }}>
              Khởi đầu mới tại FPT PolySchool
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
              Môi trường học tập hiện đại, kết hợp thực hành và kiến thức thực tiễn giúp học sinh tự tin bước vào tương lai số.
            </p>
            
            <div className="intro-grid">
              <div className="feature-card">
                <div className="feature-icon"><CheckCircle /></div>
                <h3>Học đi đôi với hành</h3>
                <p>70% thời gian thực hành, làm dự án thực tế ngay từ những ngày đầu.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><GraduationCap /></div>
                <h3>Đảm bảo đầu ra</h3>
                <p>Cơ hội học chuyển tiếp lên Cao đẳng, Đại học FPT rộng mở.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><MapPin /></div>
                <h3>Cơ sở vật chất chuẩn quốc tế</h3>
                <p>Khuôn viên xanh, phòng máy tính hiện đại tại Cần Thơ.</p>
              </div>
            </div>

            <div style={{ marginTop: '60px' }}>
              <button className="btn" style={{ maxWidth: '300px' }} onClick={() => quizRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                Tìm hiểu chuyên ngành phù hợp <ChevronRight size={20} style={{ display: 'inline', verticalAlign: 'middle' }}/>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Quiz Section */}
      {showIntro && (
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
                  {quizResult.name === 'Công nghệ thông tin' && <Code size={64} color="var(--primary-color)" />}
                  {quizResult.name === 'Quản trị kinh doanh' && <Briefcase size={64} color="var(--primary-color)" />}
                </div>
                <h3>{quizResult.name}</h3>
                <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>{quizResult.description}</p>
                <button className="btn" onClick={() => window.open('https://polyschool.fpt.edu.vn/', '_blank')}>
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
      )}
    </div>
  );
}

export default App;
