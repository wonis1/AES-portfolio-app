import { supabase } from "./supabase";
import type { CareerItem } from "../components/ui/CareerCard";

type CareerDescriptionRow = { // 회사 세부정보 타입설정
    title: string;
    detail: string;
    start_date: string | null;
    end_date: string | null;
};
type CompanyRow = { // 회사 정보 타입 설정
    name: string;
    logo_url: string | null;
    intro: string | null;
};
type CareerRow = { // 회사 전체 정보 타입 설정
    id: number;
    start_date: string;
    end_date: string;
    companies: CompanyRow[] | CompanyRow | null;     // 관계 설정에 따라 배열/객체가 모두 올 수 있음
    career_descriptions: CareerDescriptionRow[] | null; // 근데 안에서 한 일은 많을 수 있으니까 여러 개 설정.
};
export type CareerListItem = CareerItem & { id: number }; // 기존 커리어에 id 추가

export const getCareers = async (): Promise<CareerListItem[]> => { // careers 테이블을 불러옴
    const { data, error } = await supabase
        .from("careers")
        .select(`
    id,
    start_date,
    end_date,
    companies (
      name,
      logo_url,
      intro
    ),
    career_descriptions (
      title,
      detail,
      start_date,
      end_date
    )
  `).order("id", { ascending: false }); // id를 기준으로 내림차순정렬함

    if (error) throw error;
    const rows: CareerRow[] = (data ?? []) as CareerRow[]; // 디비에서 가져온 데이터가 있으면 data에 넣고 아니면 빈배열 rows에 저장

    return rows.map((row) => { // 가져온 데이터를 map돌려서 다시 만든 CareerListItem의 타입에 맞게 할당시키고 이걸 export시킴
        const company = Array.isArray(row.companies)
            ? row.companies[0]
            : row.companies ?? undefined;

        return {
            id: row.id,
            logoUrl: company?.logo_url ?? undefined,
            company: company?.name ?? "",
            startDate: row.start_date,
            endDate: row.end_date,
            intro: company?.intro ?? "",
            works: (row.career_descriptions ?? []).map((work) => ({
                title: work.title,
                startDate: work.start_date ?? undefined,
                endDate: work.end_date ?? undefined,
                detail: work.detail,
            })),
        };
    });
};
