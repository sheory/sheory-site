"use client"

import { Card } from "@/components/ui/card"
import type { ResumeFormData } from "@/app/curriculo/page"
import { TooltipProvider } from "@/components/ui/tooltip"
import { motion } from "framer-motion"

interface ResumePreviewProps {
  formData: ResumeFormData
  atsData?: any
}

export function ResumePreview({ formData, atsData }: ResumePreviewProps) {
  const highlightText = (text: string) => {
    if (!atsData?.highlights?.length) return text
    let highlighted = text
    atsData.highlights.forEach(({ text: keyword, suggestion, severity }: any) => {
      const color =
        severity === "error"
          ? "background-color: rgba(239, 68, 68, 0.3); border-color: #ef4444;"
          : "background-color: rgba(250, 204, 21, 0.25); border-color: #facc15;"
      const regex = new RegExp(`(${keyword})`, "gi")
      highlighted = highlighted.replace(
        regex,
        `<span class="highlight" style="${color}" title="${suggestion}">$1</span>`
      )
    })
    return highlighted
  }

  return (
    <TooltipProvider delayDuration={0}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:sticky lg:top-20 h-fit"
      >
        <Card
          id="resume-preview"
          className="relative min-h-[1000px] rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "#ffffff",
            color: "#333333",
            border: "1px solid #dddddd",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            padding: "2.2rem 2.8rem",
            fontFamily: "'Inter', 'PT Sans', Arial, Helvetica, sans-serif",
          }}
        >
          <style jsx global>{`
            .highlight {
              border-radius: 3px;
              border: 1px solid transparent;
              padding: 0 2px;
              cursor: help;
              transition: filter 0.2s ease;
            }
            .highlight:hover {
              filter: brightness(0.95);
            }
          `}</style>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ textAlign: "center" }}>
              <h1
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  color: "#000000",
                  letterSpacing: "0.5px",
                }}
              >
                {formData.fullName || "NOME SOBRENOME"}
              </h1>
              <p
                style={{
                  fontSize: "13px",
                  color: "#4a4a4a",
                  fontWeight: 500,
                  marginTop: "2px",
                }}
              >
                {formData.desiredRole || "Back-end Developer | Python Developer"}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "6px",
                  fontSize: "11.5px",
                  color: "#3e3e3e",
                  lineHeight: "10px",
                  marginTop: "2px",
                }}
              >
                {formData.phone && <span>{formData.phone}</span>}
                {formData.phone && formData.email && <span>•</span>}
                {formData.email && <span>{formData.email}</span>}
                {formData.email && formData.linkedin && <span>•</span>}
                {formData.linkedin && <span>{formData.linkedin}</span>}
                {formData.linkedin && formData.github && <span>•</span>}
                {formData.github && <span>{formData.github}</span>}
                {formData.github && formData.city && <span>•</span>}
                {formData.city && <span>{formData.city}</span>}
              </div>
            </div>

            {/* === SKILLS === */}
            {formData.skills.length > 0 && (
              <div style={{ paddingTop: "2px" }}>
                <div
                  style={{
                    borderBottom: "1px solid #000000",
                    paddingBottom: "2px",
                    marginBottom: "6px",
                  }}
                >
                  <h2
                    style={{
                      textAlign: "center",
                      fontWeight: 500,
                      fontSize: "12.5px",
                      letterSpacing: "0.4px",
                      color: "#000000",
                    }}
                  >
                    Skills
                  </h2>
                </div>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "11px",
                    lineHeight: "10px",
                    color: "#333333",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: highlightText(formData.skills.join(" · ")),
                  }}
                />
              </div>
            )}

            {formData.experiences.length > 0 && (
              <div style={{ paddingTop: "12px" }}>
                <div
                  style={{
                    borderBottom: "1px solid #000000",
                    paddingBottom: "4px",
                    marginBottom: "6px",
                  }}
                >
                  <h2
                    style={{
                      textAlign: "center",
                      fontWeight: 500,
                      fontSize: "12.5px",
                      color: "#000000",
                    }}
                  >
                    Experience
                  </h2>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {formData.experiences.map((exp) => (
                    <div key={exp.id}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <p
                          style={{
                            fontWeight: 600,
                            fontSize: "12px",
                            color: "#555555",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: highlightText(exp.company || "Company Name"),
                          }}
                        />
                        <p style={{ fontSize: "10.5px", color: "#555555" }}>
                          {exp.location}
                        </p>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "4px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "11px",
                            color: "#111111",
                            fontWeight: 500
                          }}
                          dangerouslySetInnerHTML={{
                            __html: highlightText(exp.role || "Job Title"),
                          }}
                        />
                        <p style={{ fontSize: "10.5px", color: "#555555" }}>
                          {exp.startDate && exp.endDate
                            ? `${exp.startDate} - ${exp.endDate}`
                            : "MM/YYYY - MM/YYYY"}
                        </p>
                      </div>

                      <ul style={{ marginLeft: "16px", listStyleType: "disc" }}>
                        {exp.responsibilities.map((r, i) => (
                          <li
                            key={i}
                            style={{
                              fontSize: "10.5px",
                              color: "#222222",
                              lineHeight: "1.25",
                              marginBottom: "2px",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: highlightText(r),
                            }}
                          />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* === EDUCATION === */}
            {formData.education.length > 0 && (
              <div style={{ paddingTop: "12px" }}>
                <div
                  style={{
                    borderBottom: "1px solid #000000",
                    paddingBottom: "4px",
                    marginBottom: "6px",
                  }}
                >
                  <h2
                    style={{
                      textAlign: "center",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      fontSize: "12.5px",
                      color: "#000000",
                    }}
                  >
                    Education
                  </h2>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {formData.education.map((edu) => (
                    <div key={edu.id}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <p
                          style={{
                            fontWeight: 600,
                            fontSize: "12px",
                            color: "#555555",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: highlightText(edu.institution || "Institution Name"),
                          }}
                        />
                        <p style={{ fontSize: "10.5px", color: "#555555" }}>
                          {edu.location}
                        </p>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "11px",
                            color: "#111111",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: highlightText(edu.degree || "Degree Name"),
                          }}
                        />
                        <p style={{ fontSize: "10.5px", color: "#555555" }}>
                          {edu.period || "YYYY - YYYY"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    </TooltipProvider>
  )
}
