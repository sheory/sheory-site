"use client"

import { Card } from "@/components/ui/card"
import type { ResumeFormData } from "@/app/curriculo/page"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
          ? "bg-red-200/60 border-red-400"
          : "bg-yellow-200/50 border-yellow-400"
      const regex = new RegExp(`(${keyword})`, "gi")
      highlighted = highlighted.replace(
        regex,
        `<span class="highlight ${color}" data-tooltip="${suggestion}">$1</span>`
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
          className="relative bg-white text-black min-h-[1000px] shadow-lg rounded-2xl border border-gray-200 overflow-hidden"
          style={{
            padding: "2.2rem 2.8rem",
            fontFamily: "'Inter', 'PT Sans', Arial, Helvetica, sans-serif",
            color: "#333",
          }}
        >
          {/* CSS inline para highlights */}
          <style jsx global>{`
            .highlight {
              border-radius: 3px;
              border: 1px solid transparent;
              padding: 0 2px;
              cursor: help;
              transition: background 0.2s ease;
            }
            .highlight:hover {
              filter: brightness(0.9);
            }
          `}</style>

          <div className="space-y-4">
            {/* === HEADER === */}
            <div className="text-center">
              <h1 className="text-[22px] font-extrabold text-black uppercase tracking-wide">
                {formData.fullName || "NOME SOBRENOME"}
              </h1>
              <p className="text-[13px] text-[#4a4a4a] mt-1 font-medium">
                {formData.desiredRole || "Back-end Developer | Python Developer"}
              </p>

              <div
                className="flex justify-center items-center gap-2 text-xs flex-wrap mt-1 text-[#3e3e3e]"
                style={{ fontSize: "11.5px", lineHeight: "16px" }}
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
              <div className="pt-3">
                <div className="border-b border-black/80 pb-1 mb-2">
                  <h2 className="text-center font-semibold uppercase text-[12.5px] tracking-wide">
                    Skills
                  </h2>
                </div>
                <p
                  className="text-center text-[11px] leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: highlightText(formData.skills.join(" · ")),
                  }}
                />
              </div>
            )}

            {/* === EXPERIENCE === */}
            {formData.experiences.length > 0 && (
              <div className="pt-4">
                <div className="border-b border-black/80 pb-1 mb-2">
                  <h2 className="text-center font-semibold uppercase text-[12.5px] tracking-wide">
                    Experience
                  </h2>
                </div>

                <div className="space-y-3">
                  {formData.experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start">
                        <p
                          className="font-semibold text-[12px]"
                          dangerouslySetInnerHTML={{
                            __html: highlightText(exp.company || "Company Name"),
                          }}
                        />
                        <p className="text-[10.5px] text-gray-700">{exp.location}</p>
                      </div>

                      <div className="flex justify-between mb-1">
                        <p
                          className="text-[11px]"
                          dangerouslySetInnerHTML={{
                            __html: highlightText(exp.role || "Job Title"),
                          }}
                        />
                        <p className="text-[10.5px] text-gray-700">
                          {exp.startDate && exp.endDate
                            ? `${exp.startDate} - ${exp.endDate}`
                            : "MM/YYYY - MM/YYYY"}
                        </p>
                      </div>

                      <ul className="list-disc ml-4 space-y-[2px]">
                        {exp.responsibilities.map((r, i) => (
                          <li
                            key={i}
                            className="text-[10.5px] leading-[1.25] text-gray-800 tracking-tight"
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
              <div className="pt-4">
                <div className="border-b border-black/80 pb-1 mb-2">
                  <h2 className="text-center font-semibold uppercase text-[12.5px] tracking-wide">
                    Education
                  </h2>
                </div>

                <div className="space-y-3">
                  {formData.education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-start">
                        <p
                          className="font-semibold text-[12px]"
                          dangerouslySetInnerHTML={{
                            __html: highlightText(edu.institution || "Institution Name"),
                          }}
                        />
                        <p className="text-[10.5px] text-gray-700">{edu.location}</p>
                      </div>

                      <div className="flex justify-between">
                        <p
                          className="text-[11px]"
                          dangerouslySetInnerHTML={{
                            __html: highlightText(edu.degree || "Degree Name"),
                          }}
                        />
                        <p className="text-[10.5px] text-gray-700">
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
